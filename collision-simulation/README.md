# 🧮 Collision Simulation: Approximating Pi with Physics

This project is a simple but visually satisfying **2D physics simulation** that models elastic collisions between two blocks and a wall — inspired by the famous **Pi approximation method** from 3Blue1Brown's video: [“The Most Unexpected Answer to a Counting Puzzle”](https://youtu.be/jsYwFizhncE).

---

## 🚀 Features

- Adjustable mass ratio of the blocks  
- Control over initial velocity  
- Variable animation speed  
- Real-time collision counter  
- Live approximation of Pi based on collision count  
- Fully responsive layout (mobile-friendly!)  
- Clean and intuitive UI

---

## ⚙️ How It Works

The red and green blocks collide with each other and the wall. The total number of collisions corresponds to the digits of Pi, based on the ratio of their masses:

- **1:100** → ~3 collisions  
- **1:10,000** → ~31 collisions  
- **1:1,000,000** → ~314 collisions

The physics is modelled using the formulas for **1D elastic collisions**:

``` js
v1' = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2)
v2' = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)
```


💻 How to Use:

1- Clone or download this repository

2- Open index.html in any modern browser

3- Adjust mass, velocity, and speed sliders

4- Hit Start Simulation

- Watch the blocks collide — and check the Pi approximation in real-time


📱 Responsive Design

The simulation interface adapts to smaller screens:

Controls and stats stack vertically

Elements scale and align for narrow viewports

Works on mobile, tablet, and desktop


````
📁 collision-simulation/
├── index.html          ← Main HTML file
├── style.css           ← All styling (desktop + mobile)
├── script.js           ← Physics logic and simulation
└── README.md           ← You’re reading this
````


Inspired by: 3Blue1Brown

Built by: [(https://github.com/Hassan1806)]

Physics concept: Elastic collisions in 1D

