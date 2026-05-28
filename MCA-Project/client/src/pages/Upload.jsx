import {
  useState
} from 'react';

import {

  UploadCloud,

  ImageIcon,

  Sparkles,

  RotateCcw,

  RotateCw

} from 'lucide-react';

import toast from 'react-hot-toast';

import imageCompression
from 'browser-image-compression';

import api from '../services/api';

const Upload = () => {

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [rotation, setRotation] =
    useState(0);

  const [message, setMessage] =
    useState('');

  const [category, setCategory] =
    useState('Friends');

  const [loading, setLoading] =
    useState(false);

  // ================= HANDLE IMAGE =================

  const handleImageChange =
    (file) => {

      if (!file) return;

      // FILE SIZE VALIDATION

      if (
        file.size >
        5 * 1024 * 1024
      ) {

        toast.error(
          'Max file size is 5MB'
        );

        return;

      }

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );

    };

  // ================= ROTATE IMAGE =================

  const rotateImage =
    async (direction) => {

      const newRotation =

        direction === 'left'

          ? rotation - 90

          : rotation + 90;

      setRotation(newRotation);

    };

  // ================= CREATE ROTATED FILE =================

  const getRotatedImage =
    (imageSrc, rotation) => {

      return new Promise(
        (resolve) => {

          const canvas =
            document.createElement(
              'canvas'
            );

          const ctx =
            canvas.getContext('2d');

          const img =
            new Image();

          img.src = imageSrc;

          img.onload = () => {

            const angle =
              (rotation * Math.PI) / 180;

            const isVertical =

              rotation % 180 !== 0;

            canvas.width =
              isVertical
                ? img.height
                : img.width;

            canvas.height =
              isVertical
                ? img.width
                : img.height;

            ctx.translate(
              canvas.width / 2,
              canvas.height / 2
            );

            ctx.rotate(angle);

            ctx.drawImage(

              img,

              -img.width / 2,

              -img.height / 2

            );

            canvas.toBlob(

              (blob) => {

                const rotatedFile =
                  new File(

                    [blob],

                    image.name,

                    {
                      type: image.type
                    }

                  );

                resolve(rotatedFile);

              },

              image.type

            );

          };

        }
      );

    };

  // ================= SUBMIT =================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        if (!image) {

          toast.error(
            'Please select image'
          );

          return;

        }

        // ROTATE IMAGE

        let processedImage =
          image;

        if (rotation !== 0) {

          processedImage =
            await getRotatedImage(
              preview,
              rotation
            );

        }

        // COMPRESS IMAGE

        const compressedFile =
          await imageCompression(

            processedImage,

            {

              maxSizeMB: 0.4,

              maxWidthOrHeight: 1600,

              useWebWorker: true

            }

          );

        const formData =
          new FormData();

        formData.append(
          'image',
          compressedFile
        );

        formData.append(
          'message',
          message
        );

        formData.append(
          'category',
          category
        );

        await api.post(
          '/memories',
          formData
        );

        toast.success(
          'Memory Uploaded ❤️'
        );

        // RESET

        setImage(null);

        setPreview(null);

        setRotation(0);

        setMessage('');

        setCategory('Friends');

      } catch (error) {

        console.log(error);

        toast.error(
          'Upload failed'
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-[#050816] px-6 py-12 relative overflow-hidden">

      {/* GLOW */}

      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-700/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-700/20 blur-3xl rounded-full"></div>

      {/* CARD */}

      <div className="relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="text-center pt-8 px-6">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 mx-auto flex items-center justify-center mb-4 shadow-xl">

            <Sparkles size={24} />

          </div>

          <h2 className="text-3xl font-bold mb-2">

            Share A Memory

          </h2>

          <p className="text-gray-400 text-sm">

            Upload your unforgettable MCA moments ✨

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-2 gap-8 p-8"
        >

          {/* LEFT */}

          <div className="border border-purple-500/20 rounded-2xl min-h-[320px] flex flex-col items-center justify-center text-center bg-white/5 p-6">

            {!preview ? (

              <label className="cursor-pointer w-full flex flex-col items-center">

                <UploadCloud
                  size={42}
                  className="text-purple-400 mb-4"
                />

                <h3 className="text-lg font-semibold mb-2">

                  Click To Upload

                </h3>

                <p className="text-gray-400 mb-4 text-sm">

                  JPG, PNG up to 5MB

                </p>

                <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2 rounded-lg font-medium text-sm shadow-lg">

                  Choose File

                </div>

                <input

                  type="file"

                  hidden

                  accept="image/*"

                  onChange={(e) =>
                    handleImageChange(
                      e.target.files[0]
                    )
                  }

                  required

                />

              </label>

            ) : (

              <div className="w-full">

                {/* PREVIEW */}

                <div className="overflow-hidden rounded-2xl border border-white/10 mb-5">

                  <img

                    src={preview}

                    alt="preview"

                    style={{
                      transform:
                        `rotate(${rotation}deg)`
                    }}

                    className="w-full max-h-[400px] object-contain transition duration-300"

                  />

                </div>

                {/* ROTATE BUTTONS */}

                <div className="flex justify-center gap-4">

                  <button

                    type="button"

                    onClick={() =>
                      rotateImage('left')
                    }

                    className="bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-xl flex items-center gap-2"

                  >

                    <RotateCcw size={18} />

                    Left

                  </button>

                  <button

                    type="button"

                    onClick={() =>
                      rotateImage('right')
                    }

                    className="bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-xl flex items-center gap-2"

                  >

                    <RotateCw size={18} />

                    Right

                  </button>

                </div>

              </div>

            )}

          </div>

          {/* RIGHT */}

          <div className="flex flex-col justify-center">

            {/* MESSAGE */}

            <textarea

              placeholder="Write your beautiful memory..."

              rows="5"

              value={message}

              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }

              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-purple-500 text-white resize-none mb-5"

              required

            />

            {/* CATEGORY */}

            <select

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }

              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 mb-5"

            >

              <option>
                Friends
              </option>

              <option>
                Me
              </option>

              <option>
                Classroom
              </option>

              <option>
                Trip
              </option>

              <option>
                Farewell
              </option>

              <option>
                Events
              </option>

            </select>

            {/* BUTTON */}

            <button

              disabled={loading}

              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3.5 rounded-xl font-semibold hover:opacity-90 transition duration-300 shadow-xl disabled:opacity-50"

            >

              {

                loading

                  ? 'Uploading...'

                  : 'Upload Memory'

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default Upload;