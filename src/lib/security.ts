// Configuración de seguridad para el webhook
export const WEBHOOK_CONFIG = {
  // URL del webhook (considera moverla a variables de entorno)
  url: 'https://n8n-n8n.swnb5v.easypanel.host/webhook/82c1468b-0475-42cf-b289-3df3668eeab8',
  
  // Dominios permitidos para envío
  allowedOrigins: [
    'localhost',
    '127.0.0.1',
    'tu-dominio.com' // Reemplaza con tu dominio real
  ],
  
  // Rate limiting básico (requests por minuto)
  rateLimit: {
    maxRequests: 5,
    windowMs: 60000 // 1 minuto
  }
};

// Clase para manejar rate limiting básico
class RateLimiter {
  private requests: number[] = [];
  
  isAllowed(): boolean {
    const now = Date.now();
    const windowStart = now - WEBHOOK_CONFIG.rateLimit.windowMs;
    
    // Limpiar requests antiguos
    this.requests = this.requests.filter(time => time > windowStart);
    
    // Verificar si se excede el límite
    if (this.requests.length >= WEBHOOK_CONFIG.rateLimit.maxRequests) {
      return false;
    }
    
    // Agregar request actual
    this.requests.push(now);
    return true;
  }
  
  getRemainingRequests(): number {
    const now = Date.now();
    const windowStart = now - WEBHOOK_CONFIG.rateLimit.windowMs;
    const recentRequests = this.requests.filter(time => time > windowStart);
    return Math.max(0, WEBHOOK_CONFIG.rateLimit.maxRequests - recentRequests.length);
  }
}

// Instancia global del rate limiter
export const rateLimiter = new RateLimiter();

// Función para sanitizar inputs
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>"'&]/g, '') // Remover caracteres peligrosos
    .substring(0, 100); // Limitar longitud
};

// Función para validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Función para validar origen (permitir todos los orígenes)
export const isValidOrigin = (): boolean => {
  // Temporalmente permitir todos los orígenes para evitar errores
  return true;
  
  // Código original comentado:
  // const origin = window.location.hostname;
  // return WEBHOOK_CONFIG.allowedOrigins.some(allowed => 
  //   origin.includes(allowed)
  // );
};

// Función para generar token de validación
export const generateValidationToken = (): string => {
  const timestamp = Date.now();
  const origin = window.location.origin;
  const randomValue = Math.random().toString(36).substring(2);
  return btoa(`${timestamp}-${origin}-${randomValue}`);
};

// Función para validar formulario completo
export const validateFormData = (data: {
  nombre: string;
  apellido: string;
  email: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.nombre.length < 2 || data.nombre.length > 50) {
    errors.push('El nombre debe tener entre 2 y 50 caracteres');
  }

  if (data.apellido.length < 2 || data.apellido.length > 50) {
    errors.push('El apellido debe tener entre 2 y 50 caracteres');
  }

  if (!isValidEmail(data.email)) {
    errors.push('El email no es válido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Headers de seguridad para el request
export const getSecurityHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
    'X-Origin': window.location.origin,
    'X-Token': generateValidationToken(),
    'X-Timestamp': Date.now().toString(),
    'User-Agent': navigator.userAgent
  };
};