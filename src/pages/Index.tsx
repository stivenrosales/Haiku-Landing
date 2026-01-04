import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  WEBHOOK_CONFIG, 
  rateLimiter, 
  sanitizeInput, 
  validateFormData, 
  getSecurityHeaders,
  isValidOrigin 
} from "@/lib/security";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar origen válido
    if (!isValidOrigin()) {
      toast({
        title: "Error de seguridad",
        description: "Origen no autorizado.",
        variant: "destructive",
      });
      return;
    }

    // Verificar rate limiting
    if (!rateLimiter.isAllowed()) {
      toast({
        title: "Demasiados intentos",
        description: `Espera un momento antes de intentar nuevamente. Intentos restantes: ${rateLimiter.getRemainingRequests()}`,
        variant: "destructive",
      });
      return;
    }
    
    // Validar formulario
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      toast({
        title: "Error de validación",
        description: validation.errors.join(', '),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Sanitizar datos antes del envío
      const sanitizedData = {
        nombre: sanitizeInput(formData.nombre),
        apellido: sanitizeInput(formData.apellido),
        email: sanitizeInput(formData.email.toLowerCase()),
        timestamp: new Date().toISOString(),
        source: 'waitlist-skool',
        userAgent: navigator.userAgent.substring(0, 200) // Limitar longitud
      };

      const response = await fetch(WEBHOOK_CONFIG.url, {
        method: 'POST',
        headers: getSecurityHeaders(),
        body: JSON.stringify(sanitizedData)
      });

      if (response.ok) {
        toast({
          title: "¡Te has unido a la lista de espera!",
          description: "Te notificaremos cuando abramos las puertas de la comunidad.",
        });

        setFormData({
          nombre: "",
          apellido: "",
          email: ""
        });
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('Error en envío:', error);
      toast({
        title: "Error",
        description: "Hubo un problema. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo y Título HAIKU */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <svg width="64" height="64" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="hsl(162 100% 32%)" stroke="none">
                  <path d="M4382 4683 c-7 -3 -24 -23 -38 -45 -44 -69 -128 -98 -604 -213 -545
-131 -853 -272 -1085 -496 -179 -173 -280 -362 -332 -617 -14 -68 -18 -134
-17 -302 0 -228 15 -344 68 -557 23 -89 23 -92 6 -131 -65 -144 -153 -445
-199 -682 l-27 -134 -42 121 -43 122 16 60 c27 105 45 252 45 371 0 322 -122
556 -376 726 -152 101 -280 150 -632 238 -266 67 -342 91 -342 108 0 5 -11 20
-25 33 -35 36 -96 35 -124 -1 -19 -24 -21 -40 -21 -176 0 -174 12 -294 46
-472 103 -528 363 -869 750 -981 79 -23 287 -50 317 -40 6 2 56 6 109 10 l97
6 36 -112 c80 -249 115 -471 124 -796 6 -238 6 -242 30 -267 34 -36 88 -36
122 0 24 26 24 26 25 262 2 367 35 672 109 1002 36 162 135 482 158 514 11 14
23 14 132 1 1006 -121 1648 494 1816 1740 13 100 22 236 26 407 l6 256 -26 26
c-25 25 -70 33 -105 19z m-46 -385 c-14 -260 -48 -485 -106 -713 -173 -678
-536 -1077 -1065 -1172 -152 -27 -545 -20 -545 10 0 23 126 230 201 331 93
123 248 272 374 359 50 35 96 74 102 89 19 39 -1 86 -44 105 -32 13 -38 12
-81 -8 -69 -34 -226 -156 -321 -250 -97 -97 -196 -221 -277 -349 -31 -50 -58
-89 -60 -87 -12 12 -36 219 -41 352 -18 546 210 893 738 1118 155 66 269 101
654 197 193 48 377 99 410 112 33 14 62 26 64 27 2 0 1 -54 -3 -121z m-3264
-1317 c150 -38 320 -87 378 -110 254 -99 412 -246 476 -445 22 -66 27 -105 31
-216 2 -74 0 -155 -4 -180 l-8 -44 -54 74 c-112 155 -331 340 -403 340 -42 0
-78 -40 -78 -85 0 -41 1 -41 126 -134 91 -67 167 -150 241 -261 75 -112 77
-117 50 -124 -41 -11 -225 -6 -299 8 -393 76 -638 409 -722 981 -23 155 -31
279 -18 271 6 -4 134 -38 284 -75z"/>
                </g>
              </svg>
              <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-wider">HAIKU</h1>
            </div>

            <div className="relative mb-4">
              <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-primary/30 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary/20 rounded-full"></div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground relative z-10">
                Aprende. Automatiza. <span className="text-primary">Transforma empresas.</span>
              </h2>
            </div>

            <div className="relative mb-16">
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Únete a la lista de espera de nuestra comunidad exclusiva donde aprenderás automatización y gestión de procesos empresariales con herramientas No Code.
              </p>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </div>

            {/* Cards Section */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
              <div className="text-center p-8 rounded-xl bg-card shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-200">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center bg-primary/10 rounded-xl">
                  <img src="/car1-logo.png" alt="N8N & Airtable" className="w-[68px] h-[68px]" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">N8N & Airtable</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">Domina n8n, Airtable y otras herramientas No Code para crear automatizaciones y bases de datos sin código.</p>
              </div>

              <div className="text-center p-8 rounded-xl bg-card shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-200">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center bg-primary/10 rounded-xl">
                  <img src="/car2-logo.svg" alt="Vibe Coding" className="w-[60px] h-[60px]" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">Vibe Coding</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">Aprende a programar con IA para construir soluciones tecnológicas de forma ágil.</p>
              </div>

              <div className="text-center p-8 rounded-xl bg-card shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-200">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center bg-primary/10 rounded-xl">
                  <img src="/car3-logo.png" alt="Gestión Empresarial" className="w-11 h-11" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">Gestión Empresarial</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">Transforma la gestión de empresas implementando sistemas, procesos y tecnología para escalar.</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="max-w-xl mx-auto relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <Input
                      type="text"
                      name="nombre"
                      placeholder="Nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3"
                    />
                    <Input
                      type="text"
                      name="apellido"
                      placeholder="Apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3"
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 sm:col-span-2"
                    />
                  </div>
                  <Button
                     type="submit"
                     disabled={isLoading}
                     className="w-full px-6 py-3 text-base font-medium"
                   >
                     {isLoading ? "Enviando..." : "Únete a la lista de espera"}
                   </Button>

                   <p className="text-xs text-muted-foreground text-center mt-3">
                     Al unirte, aceptas nuestra{" "}
                     <a
                       href="/privacy"
                       className="text-primary hover:underline"
                     >
                       Política de Privacidad
                     </a>
                     {" "}y recibir notificaciones sobre el lanzamiento.
                   </p>
                 </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer con enlaces legales */}
      <footer className="bg-background/80 backdrop-blur-sm border-t border-border/50 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Haiku. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-sm">
              <a 
                href="/privacy" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Política de Privacidad
              </a>
              <a 
                href="mailto:stivenrosales01@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
