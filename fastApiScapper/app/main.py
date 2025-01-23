from fastapi import FastAPI
from app.routes import router as api_router

app = FastAPI(
    title="My FastAPI Application",
    description="A base template for FastAPI applications.",
    version="1.0.0"
)

# Include routes
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)