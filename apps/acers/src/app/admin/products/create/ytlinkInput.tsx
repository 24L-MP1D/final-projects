// import { useState } from 'react';

// export const YouTubeLinkInput = ({ register }: { register: (name: string, value: string) => void }) => {
//   const [youtubeURL, setYoutubeURL] = useState<string>('');

//   const handleYoutubeURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const url = event.target.value;
//     setYoutubeURL(url);
//     register('youtubeURL', url); // Register the URL
//   };

//   // Check if the YouTube URL is valid
//   const isYoutubeURLValid = (url: string) => {
//     const youtubeRegex = /^https?:\/\/(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(?:[^\/]+\/)*([^\/]+)(?:\/|$)/;
//     return youtubeRegex.test(url);
//   };

//   return (
//     <div className="rounded-[12px] p-6 bg-white">
//       <span className="font-semibold text-sm">YouTube видео холбоос</span>
      
//       {/* YouTube URL input */}
//       <input
//         type="text"
//         value={youtubeURL}
//         onChange={handleYoutubeURLChange}
//         placeholder="YouTube видео холбоос"
//         className="w-full mt-2 p-2 border rounded"
//       />

//       {/* Show YouTube video if URL is valid */}
//       {isYoutubeURLValid(youtubeURL) && (
//         <div className="w-full h-64 border rounded-lg mt-4">
//           <iframe
//             className="w-full h-full"
//             src={`https://www.youtube.com/embed/${youtubeURL.split('v=')[1]?.split('&')[0]}`}
//             title="YouTube video"
//             frameBorder="0"
//             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       )}

//       {/* Error message if YouTube URL is invalid */}
//       {youtubeURL && !isYoutubeURLValid(youtubeURL) && (
//         <span className="text-red-500 text-sm mt-2">Please enter a valid YouTube URL.</span>
//       )}
//     </div>
//   );
// };
