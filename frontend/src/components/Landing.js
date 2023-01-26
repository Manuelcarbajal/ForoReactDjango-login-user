export default function Landing() {

    return (
        <div>
            <main>
                <div className="text">
                    <div className="text-welcome">
                        <h1>Welcome to</h1>
                        <h2>the forum</h2>
                    </div>

                    <h3 className="text-cuestion">
                        Do you want to join the chat?
                    </h3>
                    <h2 className="text-access"> Place Login or Register here!</h2>
                </div>

                <div className="buttons">
                    <button className="login-btn">
                        <a href="/login">LOGIN</a>
                    </button>

                    <button className="register-btn">
                        <a href="/register">REGISTER</a>
                    </button>
                </div>
            </main>
        </div>
    )
}