# Particles-2D

An interactive 2D particle simulation using HTML5 Canvas and vanilla JavaScript. Watch colorful particles bounce around the screen with realistic physics and collision detection!

## ✨ Features

- **Realistic Physics**: Implements elastic collision physics with momentum conservation
- **Interactive**: Particles react to mouse movement with opacity changes
- **Colorful**: Random color assignment from a vibrant palette
- **Responsive**: Automatically adjusts to window size
- **Smooth Animation**: Uses `requestAnimationFrame` for optimal performance

## 🚀 Demo

The project is configured for Firebase Hosting and can be deployed easily.

## 🛠️ Technologies

- HTML5 Canvas
- Vanilla JavaScript
- Firebase Hosting

## 📋 How It Works

The simulation creates 100 particles (circles) that:
- Move with random velocities
- Bounce off canvas boundaries
- Collide with each other using elastic collision physics
- React to mouse proximity by increasing opacity
- Use coordinate rotation for accurate collision resolution

### Physics Implementation

The project implements:
- **Elastic Collision Detection**: Using distance calculations between particles
- **Velocity Resolution**: Rotating coordinate systems to resolve collisions accurately
- **Mass-based Physics**: Particles exchange momentum based on mass ratios

## 🎮 Usage

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/fuadchonora/Particles-2D.git
cd Particles-2D
```

2. Open `public/index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server public
```

3. Move your mouse over the canvas to interact with the particles!

### Firebase Deployment

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize your project (if not already done):
```bash
firebase init
```

4. Deploy:
```bash
firebase deploy
```

## 📂 Project Structure

```
Particles-2D/
├── public/
│   ├── index.html    # Main HTML file
│   └── index.js      # Particle simulation logic
├── firebase.json     # Firebase hosting configuration
└── README.md         # This file
```

## 🎨 Customization

You can customize the simulation by modifying variables in `index.js`:

```javascript
// Number of particles (line ~194)
for(let i = 0; i < 100; i++) // Change 100 to your desired number

// Particle size (line ~195)
const radious = 30; // Change to adjust particle size

// Particle speed (line ~132-134)
this.velocity = {
    x: (Math.random() - 0.5) * 3, // Adjust multiplier for speed
    y: (Math.random() - 0.5) * 3,
}

// Color palette (lines 14-21)
let colors = [
    "#FF1744",
    "#F50057",
    // Add or modify colors
]

// Mouse interaction distance (line ~169)
if(distance(mouse.x, mouse.y, this.x, this.y) < 100) // Change 100
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Fuad Chonora**
- GitHub: [@fuadchonora](https://github.com/fuadchonora)

## ⭐ Show your support

Give a ⭐️ if you like this project!
