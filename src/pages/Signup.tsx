import {useState} from 'react';
import NavbarSite from "../Components/NavbarSite.tsx";


export default function Signup() {
    const [userType, setUserType] = useState('estudiante');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const formData = {
            username,
            password,
            email,
            roles: [userType]
        };

        const url = `http://localhost:8081/api/users/create`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result['message'] == 'User created successfully') {
                alert('Usuario creado correctamente');
                setEmail('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            } else {
                alert('Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error de conexión con el servidor');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <main className="container mx-auto px-4 py-8">
                <NavbarSite page={"Courses"}/>
                <div className="container mx-auto mt-12 items-center justify-center align-middle flex flex-col">
                    <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
                    <p className="text-gray-600 mb-6">Create an account to start your learning journey</p>
                    <div className="flex flex-col items-center justify-center">
                        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                            <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
                            <div className="flex justify-center space-x-4">
                                <button type="button" onClick={() => setUserType('student')}
                                        className={`w-60 py-2 px-4 border rounded-md text-white ${userType === 'estudiante' ? 'bg-yellow-400' : 'bg-blue-400 hover:bg-blue-600 transition '}`}
                                >
                                    Student
                                </button>
                                <button type="button" onClick={() => setUserType('instructor')}
                                        className={`w-60 py-2 px-4 border rounded-md text-white ${userType === 'instructor' ? 'bg-yellow-400 ' : 'bg-green-400 hover:bg-green-600 transition '}`}>
                                    Instructor
                                </button>
                            </div>

                            <input type="text" placeholder="Username" value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                                   className="w-full px-3 py-2 border rounded-md" required/>
                            <input type="email" placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="w-full px-3 py-2 border rounded-md" required/>
                            <input type="password" placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="w-full px-3 py-2 border rounded-md"
                                   required/>
                            <input type="password" placeholder="Confirm Password" value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   className="w-full px-3 py-2 border rounded-md" required/>

                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md">
                                Register
                            </button>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    );
}
