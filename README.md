# 🐍 Juego de la Culebra (Snake Game)

Un juego clásico de Snake desarrollado con HTML5, CSS3 y JavaScript vanilla. Completamente responsivo y optimizado para dispositivos móviles y de escritorio.

![Snake Game](https://img.shields.io/badge/Game-Snake-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🎮 Características

### ✨ Funcionalidades Principales
- **Juego clásico de Snake** con mecánicas tradicionales
- **Sistema de puntuación** con récord guardado localmente
- **Pausa/Reanudación** del juego
- **Detección de colisiones** precisa
- **Generación aleatoria** de comida
- **Efectos visuales** modernos y atractivos

### 📱 Diseño Responsivo
- **Adaptable a todos los dispositivos** (móvil, tablet, desktop)
- **Controles táctiles** para dispositivos móviles
- **Pad direccional** intuitivo en pantallas táctiles
- **Canvas dinámico** que se ajusta al tamaño de pantalla
- **Tipografía escalable** con `clamp()`

### 🎨 Diseño Visual
- **Gradientes modernos** y efectos de cristal esmerilado
- **Animaciones suaves** y transiciones
- **Efecto pulsante** en la comida
- **Gradiente radial** en la cabeza de la serpiente
- **Efectos hover** y feedback visual

## 🚀 Demo en Vivo

Puedes jugar el juego directamente desde: [Tu enlace aquí]

## 📥 Instalación

### Opción 1: Descarga Directa
1. Descarga el archivo `index.html`
2. Abre el archivo en tu navegador web
3. ¡Comienza a jugar!

### Opción 2: Clonar Repositorio
```bash
git clone https://github.com/carluis-berrocal/snake-game.git
cd snake-game
```

Luego abre `index.html` en tu navegador preferido.

## 🎯 Cómo Jugar

### 🖥️ En Computadora
- **Flechas del teclado**: Mover la serpiente (↑ ↓ ← →)
- **Barra espaciadora**: Pausar/Reanudar el juego

### 📱 En Dispositivos Móviles
- **Pad direccional**: Toca los botones en pantalla
- **Botón central**: Pausar/Reanudar (⏸️)

### 🎪 Reglas del Juego
1. Mueve la serpiente para comer la fruta roja
2. Cada fruta otorga 10 puntos y hace crecer la serpiente
3. Evita chocar con las paredes o contigo mismo
4. Intenta conseguir la puntuación más alta posible

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura y Canvas API
- **CSS3**: Estilos, animaciones y diseño responsivo
- **JavaScript ES6+**: Lógica del juego y interactividad
- **LocalStorage**: Persistencia del récord
- **Canvas 2D API**: Renderizado gráfico

## 📁 Estructura del Proyecto

```
snake-game/
│
├── index.html          # Archivo principal del juego
├── README.md           # Documentación del proyecto
└── assets/            # (Opcional: para imágenes adicionales)
```

## 🔧 Características Técnicas

### 📐 Configuración del Juego
- **Tamaño de grilla**: 20px por cuadrado
- **Velocidad**: 150ms por frame
- **Canvas base**: 400x400px (adaptable)
- **Detección de dispositivo**: Breakpoint en 768px

### 🎨 Estilos Destacados
- **Backdrop filter**: Efecto de cristal esmerilado
- **CSS Grid**: Para controles móviles
- **Flexbox**: Para layout responsivo
- **CSS Custom Properties**: Variables para consistencia

### 🧠 Lógica de Programación
- **Game Loop**: Actualización cada 150ms
- **Detección de colisiones**: Algoritmo eficiente
- **Sistema de coordenadas**: Grilla discreta
- **Gestión de estado**: Variables de control del juego

## 📱 Compatibilidad

### ✅ Navegadores Soportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### 📱 Dispositivos Probados
- iPhone (iOS 12+)
- Android (Chrome 60+)
- iPad
- Tablets Android
- Computadoras de escritorio

## 🎯 Roadmap y Mejoras Futuras

### 🔄 Próximas Características
- [ ] Niveles de dificultad
- [ ] Diferentes tipos de comida
- [ ] Modo multijugador local
- [ ] Temas personalizables
- [ ] Sonidos y música
- [ ] Tabla de puntuaciones online

### 🐛 Mejoras Técnicas
- [ ] Service Worker para funcionalidad offline
- [ ] Optimización de rendimiento
- [ ] Modo pantalla completa
- [ ] Soporte para gamepads

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. **Commit** tus cambios (`git commit -m 'Agrega nueva característica'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Carluis Berrocal**
- 🌐 Portfolio: [carluisberrocal.netlify.app](https://carluisberrocal.netlify.app)
- 📧 Email: [carcoste@gmail.com]
- 💼 LinkedIn: [carluis-berrocal-237910140(https://www.linkedin.com/in/carluis-berrocal-237910140)]
- 🐱 GitHub: [@carluis-berrocal]

## 🙏 Agradecimientos

- Inspirado en el clásico juego Snake de Nokia
- Gracias a la comunidad de desarrolladores por las mejores prácticas
- MDN Web Docs por la excelente documentación de Canvas API

---

### ⭐ Si te gustó este proyecto, ¡no olvides darle una estrella!

---

*Desarrollado con ❤️ por Carluis Berrocal*