import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './icons';

function App() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [minIndex, setMinIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [inputArray, setInputArray] = useState('');
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [highlightedLine, setHighlightedLine] = useState({
    java: null,
    cpp: null
  });
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

  // Define code for both languages
  const codeSnippets = {
    java: [
      "void selectionSort(int[] arr) {",
      "    int n = arr.length;",
      "    ",
      "    // One by one move boundary of unsorted subarray",
      "    for (int i = 0; i < n-1; i++) {",
      "        // Find the minimum element in unsorted array",
      "        int minIdx = i;",
      "        for (int j = i+1; j < n; j++) {",
      "            if (arr[j] < arr[minIdx]) {",
      "                minIdx = j;",
      "            }",
      "        }",
      "        ",
      "        // Swap the found minimum element with the first element",
      "        if (minIdx != i) {",
      "            int temp = arr[minIdx];",
      "            arr[minIdx] = arr[i];",
      "            arr[i] = temp;",
      "        }",
      "    }",
      "}"
    ],
    cpp: [
      "void selectionSort(int arr[], int n) {",
      "    int i, j, min_idx;",
      "    ",
      "    // One by one move boundary of unsorted subarray",
      "    for (i = 0; i < n-1; i++) {",
      "        // Find the minimum element in unsorted array",
      "        min_idx = i;",
      "        for (j = i+1; j < n; j++) {",
      "            if (arr[j] < arr[min_idx]) {",
      "                min_idx = j;",
      "            }",
      "        }",
      "        ",
      "        // Swap the found minimum element with the first element",
      "        if (min_idx != i) {",
      "            swap(arr[min_idx], arr[i]);",
      "        }",
      "    }",
      "}"
    ]
  };

  // Generate random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }
    resetStats(newArray);
  };

  // Generate a nearly sorted array
  const generateNearlySortedArray = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(i * 10 + Math.floor(Math.random() * 5));
    }
    resetStats(newArray);
  };

  // Generate a reversed array
  const generateReversedArray = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(100 - (i * 10));
    }
    resetStats(newArray);
  };

  // Reset all stats
  const resetStats = (newArray) => {
    setArray(newArray);
    setSortedIndices([]);
    setCurrentIndex(null);
    setMinIndex(null);
    setComparisons(0);
    setSwaps(0);
    setCurrentStep('');
    setHighlightedLine({ java: null, cpp: null });
    setSorting(false);
  };

  // Set custom array from input
  const setCustomArray = () => {
    try {
      // Parse the comma-separated input into an array of numbers
      const customArray = inputArray
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '')
        .map(item => {
          const num = Number(item);
          if (isNaN(num)) throw new Error('Invalid input');
          return num;
        });

      if (customArray.length < 2) {
        alert('Please enter at least 2 numbers');
        return;
      }

      // Limit array size to prevent performance issues
      const limitedArray = customArray.slice(0, 20);

      resetStats(limitedArray);
    } catch (error) {
      alert('Please enter valid comma-separated numbers (e.g. 5, 10, 3, 8)');
    }
  };

  // Selection sort implementation
  const selectionSort = async () => {
    if (sorting) return;
    setSorting(true);
    setComparisons(0);
    setSwaps(0);

    // Initial line highlight - algorithm start
    setHighlightedLine({ java: 0, cpp: 0 });
    await new Promise(resolve => setTimeout(resolve, speed/2));

    const n = array.length;
    const arrayCopy = [...array];

    // Highlight the initialization lines
    setHighlightedLine({ java: 1, cpp: 1 });
    await new Promise(resolve => setTimeout(resolve, speed/2));

    for (let i = 0; i < n; i++) {
      // Highlight outer loop
      setHighlightedLine({ java: 4, cpp: 4 });
      await new Promise(resolve => setTimeout(resolve, speed/2));

      setCurrentIndex(i);
      let minIdx = i;
      setMinIndex(minIdx);

      // Highlight finding minimum line
      setHighlightedLine({ java: 5, cpp: 5 });
      await new Promise(resolve => setTimeout(resolve, speed/2));

      setHighlightedLine({ java: 6, cpp: 6 });
      setCurrentStep(`Finding minimum element in unsorted portion [${i} to ${n-1}]`);

      for (let j = i + 1; j < n; j++) {
        // Wait for the animation
        await new Promise(resolve => setTimeout(resolve, speed));

        setCurrentIndex(j);
        // Highlight comparison line
        setHighlightedLine({ java: 7, cpp: 7 });
        setCurrentStep(`Comparing array[${j}] = ${arrayCopy[j]} with current minimum array[${minIdx}] = ${arrayCopy[minIdx]}`);
        setComparisons(prev => prev + 1);

        if (arrayCopy[j] < arrayCopy[minIdx]) {
          // Highlight update of minimum
          setHighlightedLine({ java: 8, cpp: 8 });
          minIdx = j;
          setMinIndex(minIdx);
          setCurrentStep(`New minimum found! array[${j}] = ${arrayCopy[j]} is the new minimum`);
          await new Promise(resolve => setTimeout(resolve, speed/2));
        }
      }

      // Highlight swap condition check
      setHighlightedLine({ java: 14, cpp: 14 });
      await new Promise(resolve => setTimeout(resolve, speed/2));

      if (minIdx !== i) {
        // Highlight swap operation
        setHighlightedLine({ java: 15, cpp: 15 });
        setCurrentStep(`Swapping array[${i}] = ${arrayCopy[i]} with array[${minIdx}] = ${arrayCopy[minIdx]}`);
        await new Promise(resolve => setTimeout(resolve, speed));

        // Execute the swap and update swap count
        [arrayCopy[i], arrayCopy[minIdx]] = [arrayCopy[minIdx], arrayCopy[i]];
        setArray([...arrayCopy]);
        setSwaps(prev => prev + 1); // This should update the swap counter correctly

        // Highlight the remaining swap lines
        setHighlightedLine({ java: 16, cpp: 15 });
        await new Promise(resolve => setTimeout(resolve, speed/2));
        setHighlightedLine({ java: 17, cpp: 15 });
        await new Promise(resolve => setTimeout(resolve, speed/2));
      } else {
        setCurrentStep(`Element array[${i}] = ${arrayCopy[i]} is already in the correct position`);
      }

      // Mark this index as sorted
      setSortedIndices(prev => [...prev, i]);
      await new Promise(resolve => setTimeout(resolve, speed));
    }

    setCurrentIndex(null);
    setMinIndex(null);
    setCurrentStep('Sort complete!');
    setHighlightedLine({ java: null, cpp: null });
    setSorting(false);
  };

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Apply theme class to body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  // Generate array when component mounts
  useEffect(() => {
    generateArray();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <header className="py-4 px-4 sm:px-6 border-b" style={{ borderColor: 'var(--card-border)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--primary)' }}>Selection Sort Visualization</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>A step-by-step visualization of the selection sort algorithm</p>
          </div>
          <div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full flex items-center gap-2"
              style={{ backgroundColor: 'transparent' }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <>
                  <MoonIcon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Dark Mode</span>
                </>
              ) : (
                <>
                  <SunIcon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Input section */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b" style={{ borderColor: 'var(--card-border)' }}>Input Options</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="customArray" className="block font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Custom Array (comma-separated):</label>
              <div className="flex">
                <input
                  type="text"
                  id="customArray"
                  value={inputArray}
                  onChange={(e) => setInputArray(e.target.value)}
                  placeholder="e.g. 23, 45, 12, 67, 34"
                  className="input flex-1 rounded-r-none"
                  disabled={sorting}
                />
                <button
                  onClick={setCustomArray}
                  disabled={sorting || !inputArray.trim()}
                  className="btn btn-primary rounded-l-none"
                >
                  Set Array
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={generateArray}
                disabled={sorting}
                className="btn btn-primary flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Random Array
              </button>
              <button
                onClick={generateNearlySortedArray}
                disabled={sorting}
                className="btn btn-secondary"
              >
                Nearly Sorted
              </button>
              <button
                onClick={generateReversedArray}
                disabled={sorting}
                className="btn btn-accent"
              >
                Reversed
              </button>
              <button
                onClick={selectionSort}
                disabled={sorting || array.length === 0}
                className="btn btn-success flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Sort
              </button>
            </div>
          </div>
        </div>

        {/* Stats and Controls */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b" style={{ borderColor: 'var(--card-border)' }}>Statistics & Controls</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="stat-card">
              <p className="stat-label">Array Size</p>
              <p className="stat-value">{array.length}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Array Range</p>
              <p className="stat-value">{array.length ? `${Math.min(...array)}-${Math.max(...array)}` : 'N/A'}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Comparisons</p>
              <p className="stat-value">{comparisons}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Swaps</p>
              <p className="stat-value">{swaps}</p>
            </div>
          </div>

          <div>
            <label htmlFor="speed" className="block font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Animation Speed:</label>
            <div className="flex items-center">
              <span className="text-sm mr-2" style={{ color: 'var(--text-muted)' }}>Fast</span>
              <input
                type="range"
                id="speed"
                min="50"
                max="1000"
                step="50"
                value={1050 - speed}
                onChange={(e) => setSpeed(1050 - parseInt(e.target.value))}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                style={{ backgroundColor: 'var(--card-border)' }}
              />
              <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>Slow</span>
            </div>
          </div>
        </div>

        {/* Current step display */}
        <div className="card p-4 col-span-1 lg:col-span-2">
          <p className="font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Step:</p>
          <p className="font-mono">{currentStep || 'Ready to sort'}</p>
        </div>

        {/* Color Legend */}
        <div className="flex flex-wrap gap-4 col-span-1 lg:col-span-2 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'var(--primary)' }}></div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Unsorted</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'var(--warning)' }}></div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Current Element</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'var(--danger)' }}></div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Current Minimum</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'var(--success)' }}></div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Sorted</span>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b" style={{ borderColor: 'var(--card-border)' }}>Visualization</h2>

        <div className="flex items-end justify-center h-64 gap-2 overflow-x-auto py-4 px-2">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`array-bar min-w-10 w-full max-w-16 flex flex-col items-center rounded-t
                hover:scale-105 group relative
                ${
                  idx === currentIndex ? 'current' : ''
                }`}
              style={{
                height: `${Math.min(value * 2, 220)}px`,
                backgroundColor: idx === currentIndex ? 'var(--warning)' :
                                 idx === minIndex ? 'var(--danger)' :
                                 sortedIndices.includes(idx) ? 'var(--success)' : 'var(--primary)',
                boxShadow: idx === currentIndex || idx === minIndex || sortedIndices.includes(idx) ?
                          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
              }}
            >
              <div className="h-full w-full"></div>
              <div className="font-medium py-1 text-center w-full" style={{ color: 'white' }}>{value}</div>
              {/* Add tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                   style={{ backgroundColor: 'var(--card)', color: 'var(--text-primary)', border: '1px solid var(--card-border)' }}>
                Value: {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code section */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b" style={{ borderColor: 'var(--card-border)' }}>Algorithm Implementation</h2>

        <div className="mb-4">
          <div className="flex mb-4">
            <button
              className={`btn ${selectedLanguage === 'java' ? 'btn-primary' : 'btn-outline'} rounded-r-none`}
              onClick={() => setSelectedLanguage('java')}
            >
              Java
            </button>
            <button
              className={`btn ${selectedLanguage === 'cpp' ? 'btn-primary' : 'btn-outline'} rounded-l-none`}
              onClick={() => setSelectedLanguage('cpp')}
            >
              C++
            </button>
          </div>

          <div className="relative code-block">
            <pre className="p-4 rounded overflow-x-auto text-sm font-mono">
              <button
                onClick={() => navigator.clipboard.writeText(codeSnippets[selectedLanguage].join('\n'))}
                className="absolute top-2 right-2 p-2 rounded hover:bg-opacity-10 transition-colors"
                style={{ backgroundColor: 'var(--card-border)' }}
                aria-label="Copy code"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--text-secondary)' }}>
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
              <code>
                {codeSnippets[selectedLanguage].map((line, index) => (
                  <div
                    key={index}
                    className={`code-line ${
                      highlightedLine[selectedLanguage] === index ?
                      'highlighted' : ''
                    }`}
                  >
                    <span className="mr-4 select-none" style={{ color: 'var(--text-muted)' }}>{String(index + 1).padStart(2, '0')}</span>
                    {line}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Algorithm Description */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b" style={{ borderColor: 'var(--card-border)' }}>How Selection Sort Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ol className="list-decimal pl-5 space-y-3" style={{ color: 'var(--text-secondary)' }}>
              <li><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Find the minimum:</span> Search for the smallest element in the unsorted portion of the array.</li>
              <li><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Swap:</span> Swap it with the element at the beginning of the unsorted portion.</li>
              <li><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Boundary shift:</span> Move the boundary between sorted and unsorted parts one element to the right.</li>
              <li><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Repeat:</span> Continue this process until the entire array is sorted.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Performance</h3>
            <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <li><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Time Complexity:</span> O(n²) - where n is the size of the array</li>
              <li><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Space Complexity:</span> O(1) - selection sort is an in-place algorithm</li>
              <li><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Best Case:</span> O(n²) - same as average and worst case</li>
              <li><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Stability:</span> Not stable - relative order of equal elements may change</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Credits Section */}
      <div className="card p-6 mb-8 credits-section">
        <h2 className="text-2xl font-bold gradient-text">Selection Sort Visualization</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '2px', marginBottom: '24px' }}>A step-by-step visualization of the selection sort algorithm</p>

        <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>Credits</h3>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>This interactive visualization was created as an educational tool to help understand the selection sort algorithm and its implementation.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="credits-item">
              <div className="credits-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="credits-content">
                <p className="credits-title">Algorithm</p>
                <p className="credits-description">Donald Knuth, The Art of Computer Programming</p>
              </div>
            </div>

            <div className="credits-item">
              <div className="credits-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="credits-content">
                <p className="credits-title">Implementation</p>
                <p className="credits-description">Arnab Bhowmik, Arijeet Paul , Aadya Deshpande</p>
              </div>
            </div>

            <div className="credits-item">
              <div className="credits-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="credits-content">
                <p className="credits-title">Visualization</p>
                <p className="credits-description">React & Tailwind CSS</p>
              </div>
            </div>

            <div className="credits-item">
              <div className="credits-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="credits-content">
                <p className="credits-title">Reference</p>
                <p className="credits-description">Introduction to Algorithms, CLRS</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p style={{ color: 'var(--text-secondary)' }}>Made with ❤️ by  Arnab , Arijeet & Aadya</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://en.wikipedia.org/wiki/Selection_sort" target="_blank" rel="noopener noreferrer" className="btn btn-primary flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Learn more about the algorithm
            </a>
          </div>
        </div>
      </div>

      {/* Connect */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold gradient-text">
                Connect With Us
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Follow our work and contribute to the project
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/arnab-afk/sort"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href="https://x.com/bhowmik_arnab07"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>

      </main>

      <footer className="py-6 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-secondary)' }}>Built with:</span>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--primary)' }}>React</a>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--primary)' }}>Tailwind CSS</a>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Version 1.0.0 | © {new Date().getFullYear()} Selection Sort Visualization</p>
        </div>
      </footer>
    </div>
  );
}

export default App;


