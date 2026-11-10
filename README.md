# AI Resume Builder and Optimizer

An intelligent resume builder and optimizer that tailors resumes to job descriptions using AI, maintaining a verified source-of-truth profile and exporting optimized resumes.

## Project Structure

```text
├── backend/                # FastAPI Python backend
│   ├── app/
│   │   ├── api/            # API endpoints & route handlers
│   │   ├── core/           # Configuration & settings
│   │   ├── database/       # SQLAlchemy models & DB connection
│   │   ├── schemas/        # Pydantic schemas
│   │   └── main.py         # FastAPI application entry point
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Example environment configuration
├── frontend/               # Next.js React frontend
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/     # UI & feature components
│   │   └── lib/            # Utilities and helpers
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript configuration
└── README.md
```

## Getting Started

### 1. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
copy .env.example .env
# Edit .env and supply your ANTHROPIC_API_KEY

# Start backend server
uvicorn app.main:app --reload --port 8000
```

The API docs will be available at `http://localhost:8000/docs`.

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
