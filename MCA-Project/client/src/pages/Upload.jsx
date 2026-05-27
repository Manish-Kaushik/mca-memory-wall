import {
  useState
} from 'react';

import {
  UploadCloud,
  ImageIcon,
  Sparkles
} from 'lucide-react';

import imageCompression
from 'browser-image-compression';

import api from '../services/api';

const Upload = () => {

  const [image, setImage] =
    useState(null);

  const [message, setMessage] =
    useState('');

  const [category, setCategory] =
    useState('Friends');

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        let compressedFile =
          image;

        if (image) {

          compressedFile =
            await imageCompression(
              image,
              {
                maxSizeMB: 0.4,
                maxWidthOrHeight: 1600,
                useWebWorker: true
              }
            );

        }

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

        alert(
          'Memory Uploaded ❤️'
        );

        setImage(null);

        setMessage('');

      } catch (error) {

        console.log(error);

        alert(
          'Upload failed'
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-[#050816] px-6 py-12 relative overflow-hidden">

      {/* GLOW EFFECTS */}

      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-700/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-700/20 blur-3xl rounded-full"></div>

      {/* MAIN CARD */}

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

          <label className="border border-purple-500/20 rounded-2xl min-h-[280px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition duration-300 bg-white/5 p-6">

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
                setImage(
                  e.target.files[0]
                )
              }
              required
            />

            {image && (

              <div className="mt-5 bg-white/10 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 max-w-[90%]">

                <ImageIcon
                  size={18}
                  className="text-purple-400"
                />

                <span className="truncate text-sm">

                  {image.name}

                </span>

              </div>

            )}

          </label>

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