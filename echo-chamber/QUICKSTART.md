# 🚀 Quick Start - Echo Chamber Web Interface

## Get Started in 30 Seconds

```bash
# 1. Navigate to project
cd /Users/marcela/Adventures/CopilotAdventures/echo-chamber

# 2. Install (first time only)
npm install

# 3. Start the server
npm start

# 4. Open browser
# → http://localhost:3000
```

## What You Get

✨ **Beautiful Web Interface** at http://localhost:3000
- Enter sequences: `3, 6, 9, 12`
- Click buttons to predict
- View session memory
- Try 6 example sequences

## Commands

```bash
npm start              # ⭐ Web interface (port 3000)
npm run console        # 🖥️  Console mode
npm test              # 🧪 Run tests
npm run dev           # 🔧 Development mode
node examples.js      # 📖 View examples
```

## API Endpoints

```bash
# Predict
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"sequence": [3, 6, 9, 12]}'

# Get memory
curl http://localhost:3000/api/memory

# Server status
curl http://localhost:3000/api/status
```

## Documentation

| File | Purpose |
|------|---------|
| **WEB.md** | Complete web guide & API reference |
| **IMPLEMENTATION.md** | What was added & how it works |
| **README.md** | Main documentation |
| **TESTING.md** | Test results & procedures |

## Stop the Server

Press `Ctrl+C` in the terminal.

## Troubleshooting

**Port 3000 already in use?**
```bash
PORT=8080 npm start
# Visit http://localhost:8080
```

**Module not found?**
```bash
npm install
npm start
```

**Want console mode?**
```bash
npm run console
```

---

**That's it! Enjoy exploring the Chamber of Echoes! ✨**
