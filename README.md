# Selection Sort Visualization

An interactive web application that visualizes the Selection Sort algorithm step-by-step. This project helps users understand how the selection sort algorithm works through an animated, visual representation.

![Selection Sort Visualization](screenshot.png)

## Features

- **Interactive Visualization**: Watch the selection sort algorithm in action with step-by-step animation
- **Custom Input**: Enter your own array of numbers to sort
- **Array Generation Options**: Generate random arrays, nearly sorted arrays, or reversed arrays
- **Statistics Tracking**: Monitor comparisons and swaps during the sorting process
- **Animation Speed Control**: Adjust the speed of the visualization
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Responsive Design**: Works on desktop and mobile devices

## How Selection Sort Works

Selection Sort is a simple comparison-based sorting algorithm:

1. Find the minimum element in the unsorted portion of the array
2. Swap it with the element at the beginning of the unsorted portion
3. Move the boundary between sorted and unsorted portions one element to the right
4. Repeat until the entire array is sorted

## Technologies Used

- **React**: Frontend library for building the user interface
- **Vite**: Build tool for fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework for styling
- **CSS Variables**: For implementing the theme system

## Performance

- **Time Complexity**: O(n²) - where n is the size of the array
- **Space Complexity**: O(1) - selection sort is an in-place algorithm

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/arnab-afk/sort.git
cd sort

# Install dependencies
npm install
# or
yarn

# Start the development server
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:5173` to see the application running.

## Build for Production

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Donald Knuth, The Art of Computer Programming
- Introduction to Algorithms, CLRS
