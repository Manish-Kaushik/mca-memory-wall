import {
  useState
} from 'react';

import {
  UploadCloud,
  Image,
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
                maxSizeMB: 0.3,
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

    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-700/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 w-full max-w-2xl glass rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 mx-auto flex items-center justify-center mb-4">

            <Sparkles size={30} />

          </div>

          <h2 className="text-4xl font-bold mb-2">

            Share A Memory

          </h2>

          <p className="text-gray-400">

            Upload your unforgettable moments

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <label className="border-2 border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition duration-300">

            <UploadCloud
              size={40}
              className="text-purple-400 mb-4"
            />

            <p className="text-lg font-semibold">

              Click To Upload Image

            </p>

            <p className="text-gray-400 text-sm mt-2">

              JPG, PNG supported

            </p>

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

          </label>

          {image && (

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">

              <Image
                size={22}
                className="text-purple-400"
              />

              <span className="truncate">

                {image.name}

              </span>

            </div>

          )}

          <textarea
            placeholder="Write your memory..."
            rows="5"
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-purple-500"
            required
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500"
          >

            <option>
              Friends
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

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-xl disabled:opacity-50"
          >

            {
              loading
                ? 'Uploading...'
                : 'Upload Memory'
            }

          </button>

        </form>

      </div>

    </div>

  );

};

export default Upload;