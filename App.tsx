
import React, { useState } from 'react';

const App: React.FC = () => {
  const [lyrics, setLyrics] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string>('');

  const handleGenerateTrack = async () => {
    if (!lyrics.trim()) {
      alert('Please enter some lyrics first.');
      return;
    }
    setIsGenerating(true);
    setAudioSrc(''); // Clear previous track

    try {
      const response = await fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lyrics }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Server response:', data);

      // For now, we'll still use a placeholder audio file for demonstration,
      // as the backend only sends a success message.
      setAudioSrc('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

    } catch (error) {
      console.error('Error generating track:', error);
      alert('Failed to connect to the server. Please ensure it is running and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-white font-sans">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Rhyme Architect AI
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Turn your words into beats. Paste your lyrics and let AI create the music.
          </p>
        </header>

        <main className="bg-slate-800/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700">
          <div className="flex flex-col space-y-6">
            <label htmlFor="lyrics-input" className="sr-only">Lyrics Input</label>
            <textarea
              id="lyrics-input"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="In a world of code, a story starts to rhyme,
With every keystroke, transcending space and time.
A silent poet, in the digital divine,
Crafting verses, line by epic line..."
              className="w-full h-72 p-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 text-base resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
              aria-label="Lyrics Input Area"
            />
            <button
              onClick={handleGenerateTrack}
              disabled={isGenerating || !lyrics.trim()}
              className="w-full flex items-center justify-center px-8 py-4 bg-purple-600 text-white font-bold rounded-lg transition-all duration-300 ease-in-out hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
              aria-live="polite"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Track'
              )}
            </button>
          </div>
        </main>

        <footer className="w-full">
            <div className="bg-slate-800/50 p-4 rounded-2xl shadow-lg border border-slate-700">
               <h2 className="text-lg font-semibold mb-3 text-center text-slate-300">
                 {audioSrc ? 'Your Generated Track' : 'Playback'}
               </h2>
               <audio controls src={audioSrc} className="w-full" key={audioSrc}>
                    Your browser does not support the audio element.
               </audio>
               {!audioSrc && (
                 <p className="text-center text-sm text-slate-500 mt-2">
                   Your generated track will appear here.
                 </p>
               )}
            </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
