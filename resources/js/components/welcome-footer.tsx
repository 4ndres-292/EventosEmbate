// components/welcome-footer.tsx
import { MapPin, Clock, Share2 } from 'lucide-react';

export function WelcomeFooter() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sección ¡Visítanos! */}
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <MapPin className="h-6 w-6 text-blue-400 mr-2" />
                            <h3 className="text-xl font-bold">¡Visítanos!</h3>
                        </div>
                        <p className="text-gray-300">
                            Frente al Parque de la facultad<br />
                            de Tecnología de la UMSS<br />
                            Cochabamba - Bolivia<br />
                            Contacto: <br />
                            77953146 <br />

                        </p>
                        <div className="mt-4 aspect-video bg-gray-800 rounded-lg">
                            {/* Aquí iría tu mapa embebido */}
                        </div>
                    </div>

                    {/* Sección Horarios */}
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <Clock className="h-6 w-6 text-blue-400 mr-2" />
                            <h3 className="text-xl font-bold">Horarios</h3>
                        </div>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex justify-between">
                                <span>Lunes - Viernes</span>
                                <span>8:00 - 16:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sábados y Domingos</span>
                                <span>Cerrado</span>
                            </li>
                        </ul>
                    </div>

                    {/* Sección Síguenos */}
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <Share2 className="h-6 w-6 text-blue-400 mr-2" />
                            <h3 className="text-xl font-bold">Síguenos</h3>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                                <img src="/facebook-icon.svg" className="h-6 w-6" alt="Facebook" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                                <img src="/instagram-icon.svg" className="h-6 w-6" alt="Instagram" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                                <img src="/whatsapp-icon.svg" className="h-6 w-6" alt="WhatsApp" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Derechos de autor */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
                    <p>© 2025 EMBATE. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}