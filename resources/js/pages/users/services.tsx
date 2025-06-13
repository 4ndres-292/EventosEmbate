import { Head } from '@inertiajs/react';
import { WelcomeHeader } from '@/components/welcome-header';
import { WelcomeFooter } from '@/components/welcome-footer';

export default function Services() {
    return (
        <>
            <Head title="Servicios" />
            <WelcomeHeader />
            <main className="flex-1 bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors duration-300">
                <div className="min-h-screen px-6 py-12">
                    <div className="max-w-6xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-10">
                            Servicios <span className="text-blue-600 dark:text-blue-400">EMBATE</span>
                        </h1>

                        <p className="text-lg md:text-xl mb-14 max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-300">
                            En EMBATE ofrecemos soluciones creativas y tecnológicas para emprendedores, desde prototipado hasta comercialización.
                            Descubre todo lo que podemos hacer por ti.
                        </p>

                        <div className="space-y-12 text-left max-w-4xl mx-auto">
                            {/** Servicio: Impresión 3D */}
                            <ServiceBlock
                                title="🖨️ Impresión 3D"
                                summary="Prototipa, crea y materializa tus ideas con tecnología de impresión 3D de alta precisión."
                                details="Ofrecemos servicios de impresión 3D en diversos materiales, ideales para emprendedores que necesitan crear prototipos, piezas funcionales, diseños personalizados o pequeños lotes de producción. Utilizamos impresoras de alta calidad que garantizan precisión y buenos acabados. Es una solución eficaz para validar ideas o crear productos sin necesidad de moldes caros."
                            />

                            {/** Servicio: Modelado */}
                            <ServiceBlock
                                title="📐 Diseño de modelos para impresión 3D"
                                summary="¿Tienes una idea pero no sabes cómo modelarla? Nosotros la diseñamos por ti."
                                details="Nuestro equipo de diseño 3D te acompaña en la creación de modelos digitales listos para impresión. Ya sea a partir de bocetos, imágenes o conceptos, desarrollamos archivos STL o compatibles con diversas tecnologías. También ofrecemos asesoría en diseño funcional, tolerancias y optimización de estructuras para impresiones más eficientes."
                            />

                            {/** Servicio: Sublimación */}
                            <ServiceBlock
                                title="🎨 Sublimación"
                                summary="Personaliza tazas, camisetas, llaveros y mucho más con tu propia marca o diseño."
                                details="La sublimación es ideal para productos promocionales o de venta. Imprimimos en alta calidad sobre una amplia variedad de superficies como textiles, cerámicas, metales o plásticos tratados. Este servicio es perfecto para emprendimientos que desean diferenciar su marca o para campañas personalizadas de marketing."
                            />

                            {/** Servicio: Tienda */}
                            <ServiceBlock
                                title="🛍️ Tienda de productos de emprendedores"
                                summary="Conecta tus productos con el público. En nuestra tienda, los emprendedores tienen un espacio para vender."
                                details="EMBATE cuenta con una tienda física y virtual dedicada exclusivamente a productos de emprendedores. Brindamos visibilidad, espacio de exposición y asesoramiento en temas de precio, empaque y venta. Es una plataforma de impulso comercial donde las ideas se convierten en oportunidades reales de negocio."
                            />
                        </div>
                    </div>
                </div>
            </main>
            <WelcomeFooter />
        </>
    );
}

function ServiceBlock({
    title,
    summary,
    details,
}: {
    title: string;
    summary: string;
    details: string;
}) {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{title}</h2>
            <p className="text-md mb-3 text-gray-800 dark:text-gray-300">{summary}</p>
            <details className="bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border p-5 rounded-lg shadow-sm group transition-all">
                <summary className="cursor-pointer text-blue-600 dark:text-blue-400 font-medium group-open:mb-3 transition-colors">
                    Leer más
                </summary>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {details}
                </div>
            </details>
        </div>
    );
}
