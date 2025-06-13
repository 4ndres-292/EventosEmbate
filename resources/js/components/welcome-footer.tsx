import { MapPin, Clock } from 'lucide-react';
import { SiWhatsapp, SiFacebook, SiInstagram, SiTiktok } from 'react-icons/si';
import { MdEmail, MdLanguage } from 'react-icons/md';

export function WelcomeFooter() {
    const phoneNumber = "+59177953146"; // Número con código internacional
    return (
        <footer className="bg-white dark:bg-black text-gray-700 dark:text-gray-300 py-10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Sección ¡Visítanos! */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors duration-500" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-500">¡Visítanos!</h3>
                        </div>
                        <p className="leading-relaxed text-sm">
                            Frente al Parque de la facultad<br />
                            de Tecnología de la UMSS<br />
                            Cochabamba - Bolivia<br />
                            <a
                                href={`https://maps.app.goo.gl/MmF3DKBpidK2uBgQ8`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Ver en Google Maps
                            </a>
                        </p>
                    </div>

                    {/* Sección Horarios */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors duration-500" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-500">Horarios</h3>
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1 transition-colors duration-500">
                                <span>Lunes - Viernes</span>
                                <span>8:00 - 16:00</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1 transition-colors duration-500">
                                <span>Sábados y Domingos</span>
                                <span>Cerrado</span>
                            </li>
                        </ul>
                    </div>

                    {/* Sección Síguenos */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-4">
                            <MdLanguage className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors duration-500" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-500">Síguenos</h3>
                        </div>
                        <div className="flex flex-col space-y-3 text-sm">
                            <a
                                href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                            >
                                <SiWhatsapp className="h-5 w-5" /> WhatsApp: {phoneNumber}
                            </a>
                            <a
                                href="https://www.facebook.com/p/EMBATE-Incubadora-de-empresas-de-base-Tecnol%C3%B3gica-100064455141674/?locale=es_LA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                <SiFacebook className="h-5 w-5" /> Facebook
                            </a>
                            <a
                                href="https://www.instagram.com/embate_umss/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"
                            >
                                <SiInstagram className="h-5 w-5" /> Instagram
                            </a>
                            <a
                                href="https://www.tiktok.com/@embate.incubadora"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                            >
                                <SiTiktok className="h-5 w-5" /> TikTok
                            </a>
                            <a
                                href="https://embate.umss.edu.bo/embate/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                <MdLanguage className="h-5 w-5" /> Página web
                            </a>
                            <a
                                href="mailto:embate@fcyt.umss.edu.bo"
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
                            >
                                <MdEmail className="h-5 w-5" /> embate@fcyt.umss.edu.bo
                            </a>
                        </div>
                    </div>
                </div>

                {/* Derechos de autor */}
                <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm select-none transition-colors duration-500">
                    <p>© 2025 EMBATE. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
