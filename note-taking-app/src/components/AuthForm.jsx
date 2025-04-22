export default function AuthForm({ email, setEmail, password, setPassword, onLogin, onRegister }) {
    return (
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border"
        />
        <button onClick={onLogin} className="p-2 border rounded">Login</button>
        <button onClick={onRegister} className="p-2 border rounded">Register</button>
      </div>
    );
  }