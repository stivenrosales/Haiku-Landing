import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Política de Privacidad
          </h1>
          <p className="text-muted-foreground text-lg">
            En Haiku, tu privacidad es nuestra prioridad. Conoce cómo protegemos y utilizamos tus datos para nuestra comunidad de aprendizaje.
          </p>
        </div>

        {/* Resumen ejecutivo */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Resumen de Privacidad
            </CardTitle>
            <CardDescription>
              Lo más importante que debes saber sobre cómo manejamos tus datos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">No compartimos tus datos</h3>
                  <p className="text-sm text-muted-foreground">
                    Tus datos son exclusivamente de Haiku y nunca los vendemos o compartimos con terceros.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Uso comercial transparente</h3>
                  <p className="text-sm text-muted-foreground">
                    Utilizamos tus datos para notificarte sobre el lanzamiento de la comunidad y enviarte contenido educativo relevante.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Máxima seguridad</h3>
                  <p className="text-sm text-muted-foreground">
                    Implementamos las mejores prácticas de seguridad para proteger tu información.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Tus derechos garantizados</h3>
                  <p className="text-sm text-muted-foreground">
                    Puedes acceder, modificar o eliminar tus datos en cualquier momento.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secciones principales */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>¿Qué datos recopilamos?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Información personal:</strong> Nombre, apellido y email</li>
                <li>• <strong>Datos técnicos:</strong> IP, navegador y fecha de suscripción</li>
                <li>• <strong>Interacciones:</strong> Clicks, aperturas de email y preferencias</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Cómo utilizamos tus datos?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Comunidad y Newsletter:</strong> Notificaciones sobre el lanzamiento y contenido educativo sobre automatización y Airtable</li>
                <li>• <strong>Acceso a la comunidad:</strong> Información sobre talleres, cursos y eventos de la comunidad Skool</li>
                <li>• <strong>Personalización:</strong> Contenido educativo adaptado a tu nivel de conocimiento</li>
                <li>• <strong>Mejora del servicio:</strong> Análisis para optimizar la experiencia</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tus derechos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Derechos fundamentales:</h4>
                  <ul className="space-y-1">
                    <li>• Acceso a tus datos</li>
                    <li>• Rectificación de información</li>
                    <li>• Eliminación de datos</li>
                    <li>• Portabilidad de datos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cómo ejercerlos:</h4>
                  <ul className="space-y-1">
                    <li>• Email: stivenrosales01@gmail.com</li>
                    <li>• Respuesta en 30 días</li>
                    <li>• Proceso gratuito</li>
                    <li>• Sin justificación requerida</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seguridad y protección</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Cifrado:</h4>
                  <p>Todos los datos se transmiten y almacenan con cifrado de grado militar.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Acceso limitado:</h4>
                  <p>Solo personal autorizado puede acceder a la información personal.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Monitoreo:</h4>
                  <p>Supervisión continua para detectar y prevenir accesos no autorizados.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conservación de datos</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-2">
                <p><strong>Suscriptores activos:</strong> Mientras mantengas tu suscripción</p>
                <p><strong>Suscriptores inactivos:</strong> Hasta 3 años desde la última interacción</p>
                <p><strong>Datos técnicos:</strong> Hasta 12 meses para análisis de seguridad</p>
                <p className="text-muted-foreground mt-4">
                  Transcurridos estos períodos, eliminamos de forma segura toda tu información personal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer de contacto */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>¿Tienes preguntas?</CardTitle>
            <CardDescription>
              Estamos aquí para resolver cualquier duda sobre tu privacidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <a href="mailto:stivenrosales01@gmail.com">
                    Contactar por email
                  </a>
                </Button>
              </div>
          </CardContent>
        </Card>

        {/* Información legal */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Esta política cumple con GDPR, LOPD y demás normativas de protección de datos.</p>
          <p className="mt-2">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;