import Link from "next/link";

export default function NotFound(): JSX.Element {
    return (
        <main
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                flexDirection: "column",
                gap: 16,
                padding: 24,
                textAlign: "center",
            }}
        >
            <h1 style={{ fontSize: 72, margin: 0 }}>404</h1>
            <p style={{ margin: 0, fontSize: 18 }}>Page not found.</p>
            <Link
                href="/"
                style={{
                    marginTop: 16,
                    padding: "8px 16px",
                    background: "#111",
                    color: "#fff",
                    borderRadius: 6,
                    textDecoration: "none",
                }}
            >
                Go to home
            </Link>
        </main>
    );
}