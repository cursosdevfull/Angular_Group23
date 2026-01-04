-- Insertar courses
INSERT INTO courses (title, createdAt, updatedAt) VALUES
-- Frontend Courses
('HTML5 Semántico y Accesibilidad Web', NOW(), NOW()),
('CSS3 Avanzado y Flexbox/Grid', NOW(), NOW()),
('JavaScript ES6+ Fundamentals', NOW(), NOW()),
('TypeScript para Desarrollo Web', NOW(), NOW()),
('React.js - Hooks y Context API', NOW(), NOW()),
('Vue.js 3 - Composition API', NOW(), NOW()),
('Angular 18 - Signals y Control Flow', NOW(), NOW()),
('Next.js - Full Stack React Framework', NOW(), NOW()),
('Svelte y SvelteKit', NOW(), NOW()),
('Tailwind CSS - Utility-First Framework', NOW(), NOW()),
('Webpack y Vite - Module Bundlers', NOW(), NOW()),
('Testing Frontend con Jest y Cypress', NOW(), NOW()),
('PWA - Progressive Web Apps', NOW(), NOW()),
('Micro-frontends con Module Federation', NOW(), NOW()),
('Web Performance Optimization', NOW(), NOW()),

-- Backend Courses
('Node.js - APIs REST con Express', NOW(), NOW()),
('Python Django - Framework Web', NOW(), NOW()),
('FastAPI - APIs modernas con Python', NOW(), NOW()),
('Java Spring Boot - Microservicios', NOW(), NOW()),
('C# .NET Core - Web APIs', NOW(), NOW()),
('Go - Desarrollo de APIs Concurrentes', NOW(), NOW()),
('Rust - Sistemas de Alto Rendimiento', NOW(), NOW()),
('GraphQL con Apollo Server', NOW(), NOW()),
('Bases de Datos PostgreSQL Avanzado', NOW(), NOW()),
('MongoDB - Base de Datos NoSQL', NOW(), NOW()),
('Redis - Cache y Session Store', NOW(), NOW()),
('Docker - Containerización de Aplicaciones', NOW(), NOW()),
('Kubernetes - Orquestación de Contenedores', NOW(), NOW()),
('Microservicios - Arquitectura Distribuida', NOW(), NOW()),
('Event-Driven Architecture con RabbitMQ', NOW(), NOW()),

-- Infrastructure as Code (IaC)
('Terraform - Infraestructura como Código', NOW(), NOW()),
('Ansible - Automatización de Configuraciones', NOW(), NOW()),
('Pulumi - IaC con Lenguajes de Programación', NOW(), NOW()),
('AWS CloudFormation - Templates', NOW(), NOW()),
('Azure ARM Templates', NOW(), NOW()),
('Google Cloud Deployment Manager', NOW(), NOW()),
('Helm Charts para Kubernetes', NOW(), NOW()),
('GitOps con ArgoCD y Flux', NOW(), NOW()),
('Vagrant - Ambientes de Desarrollo', NOW(), NOW()),
('Packer - Automatización de Imágenes', NOW(), NOW()),
('Chef - Configuration Management', NOW(), NOW()),
('Puppet - Infrastructure Automation', NOW(), NOW()),
('SaltStack - Remote Execution', NOW(), NOW()),
('Crossplane - Cloud Native IaC', NOW(), NOW()),
('CDK - Cloud Development Kit', NOW(), NOW()),

-- Cloud Courses
('AWS Solutions Architect Associate', NOW(), NOW()),
('Azure Fundamentals AZ-900', NOW(), NOW()),
('Google Cloud Platform - Core Services', NOW(), NOW()),
('AWS Lambda - Serverless Computing', NOW(), NOW()),
('Azure Functions - Event-Driven Computing', NOW(), NOW()),
('Google Cloud Functions', NOW(), NOW()),
('AWS EKS - Kubernetes en la Nube', NOW(), NOW()),
('Azure Kubernetes Service (AKS)', NOW(), NOW()),
('Google Kubernetes Engine (GKE)', NOW(), NOW()),
('Multi-Cloud Strategy y Hybrid Cloud', NOW(), NOW()),
('Cloud Security Best Practices', NOW(), NOW()),
('Cloud Cost Optimization', NOW(), NOW()),
('Monitoring y Observabilidad en Cloud', NOW(), NOW()),
('Disaster Recovery en la Nube', NOW(), NOW()),
('Cloud Native Architecture Patterns', NOW(), NOW());

-- Insertar roles
INSERT INTO roles (name, createdAt, updatedAt) VALUES
('admin', NOW(), NOW()),
('teacher', NOW(), NOW()),
('student', NOW(), NOW());

-- Insertar users (passwords are 'password123' hashed with bcrypt)
INSERT INTO users (name, email, password, createdAt, updatedAt) VALUES
('Admin User', 'admin@example.com', '$2b$10$XjvxwSPxlLv2Vu3QJXRKPem8DM8CvKO/MZLEEzyCrECQXjhTOXcxy', NOW(), NOW()),
('John Teacher', 'john.teacher@example.com', '$2b$10$XjvxwSPxlLv2Vu3QJXRKPem8DM8CvKO/MZLEEzyCrECQXjhTOXcxy', NOW(), NOW()),
('Jane Student', 'jane.student@example.com', '$2b$10$XjvxwSPxlLv2Vu3QJXRKPem8DM8CvKO/MZLEEzyCrECQXjhTOXcxy', NOW(), NOW());

-- Insertar relaciones user_roles
INSERT INTO user_roles (userId, roleId) VALUES
(1, 1), -- Admin User -> admin role
(2, 2), -- John Teacher -> teacher role
(3, 3); -- Jane Student -> student role

-- Insertar teachers
INSERT INTO teachers (name, lastname, email, phone, summary, linkedin, photoUrl, skills, createdAt, updatedAt) VALUES
(
    'María',
    'González',
    'maria.gonzalez@email.com',
    '+1-555-0101',
    'Experta desarrolladora frontend con más de 8 años de experiencia en Angular, React y Vue.js. Ha liderado equipos de desarrollo en empresas tecnológicas y es apasionada por la enseñanza.',
    'https://linkedin.com/in/maria-gonzalez-dev',
    'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=400',
    'Angular,TypeScript,JavaScript,HTML5,CSS3,React,Vue.js',
    NOW(),
    NOW()
),
(
    'Carlos',
    'Rodríguez',
    'carlos.rodriguez@email.com',
    '+1-555-0102',
    'Ingeniero backend especializado en Node.js y bases de datos. Con experiencia en arquitecturas de microservicios y desarrollo de APIs RESTful escalables.',
    'https://linkedin.com/in/carlos-rodriguez-backend',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    'Node.js,NestJS,TypeScript,PostgreSQL,MongoDB,Docker,AWS',
    NOW(),
    NOW()
),
(
    'Ana',
    'Martínez',
    'ana.martinez@email.com',
    '+1-555-0103',
    'Especialista en UX/UI Design con formación en psicología. Combina principios de diseño centrado en el usuario con tecnologías web modernas.',
    'https://linkedin.com/in/ana-martinez-ux',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    'Figma,Adobe XD,HTML5,CSS3,JavaScript,User Research,Prototyping',
    NOW(),
    NOW()
),
(
    'Luis',
    'Fernández',
    'luis.fernandez@email.com',
    '+1-555-0104',
    'Desarrollador full-stack con experiencia en tecnologías modernas. Especializado en desarrollo ágil y metodologías DevOps.',
    'https://linkedin.com/in/luis-fernandez-fullstack',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'React,Node.js,Python,Django,PostgreSQL,Docker,Kubernetes',
    NOW(),
    NOW()
),
(
    'Carmen',
    'López',
    'carmen.lopez@email.com',
    '+1-555-0105',
    'Data Scientist con background en matemáticas y estadística. Experta en machine learning y análisis de datos con Python.',
    'https://linkedin.com/in/carmen-lopez-data',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
    'Python,Machine Learning,Pandas,NumPy,Scikit-learn,TensorFlow,SQL',
    NOW(),
    NOW()
);

-- Insertar schedules (asumiendo que los primeros 5 cursos existen con IDs 1-5)
INSERT INTO schedules (imageUrl, resume, goals, syllabus, requirements, frequency, start, rangeHours, slogan, title, duration, courseId, teacherId, createdAt, updatedAt) VALUES
(
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
    'Curso intensivo de Angular para principiantes que cubre desde los conceptos básicos hasta la creación de aplicaciones completas.',
    'Dominar los fundamentos de Angular,Crear componentes reutilizables,Implementar routing y navegación,Gestionar estado de aplicaciones,Desarrollar aplicaciones completas',
    'Introducción a Angular y TypeScript,Componentes y Templates,Servicios e Inyección de Dependencias,Routing y Navegación,Formularios Reactivos,HTTP Client y APIs,Testing en Angular,Proyecto Final',
    'Conocimientos básicos de JavaScript,Familiaridad con HTML y CSS,Conceptos básicos de programación',
    'Lunes, Miércoles y Viernes',
    '2024-02-15T10:00:00Z',
    '10:00 - 12:00',
    '¡Construye aplicaciones modernas con Angular!',
    'Angular Fundamentals - Horario Matutino',
    120,
    1,
    1,
    NOW(),
    NOW()
),
(
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
    'Programa avanzado de Node.js y NestJS para desarrollar APIs robustas y escalables.',
    'Crear APIs RESTful profesionales,Implementar autenticación y autorización,Trabajar con bases de datos,Aplicar patrones de arquitectura,Desplegar aplicaciones en producción',
    'Fundamentos de Node.js,Introducción a NestJS,Modules, Controllers y Services,TypeORM y Base de Datos,Autenticación con JWT,Testing y Documentación,Deployment y DevOps',
    'Experiencia con JavaScript/TypeScript,Conocimientos de programación orientada a objetos,Familiaridad con bases de datos',
    'Martes y Jueves',
    '2024-03-01T19:00:00Z',
    '19:00 - 21:30',
    'Backend profesional con las mejores prácticas',
    'NestJS Professional Development',
    150,
    2,
    2,
    NOW(),
    NOW()
),
(
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600',
    'Curso completo de diseño UX/UI enfocado en crear experiencias digitales excepcionales.',
    'Entender principios de UX Design,Crear wireframes y prototipos,Diseñar interfaces modernas,Realizar investigación de usuarios,Implementar design systems',
    'Fundamentos de UX/UI,Research y User Personas,Wireframing y Prototyping,Design Systems,Herramientas de Diseño,Usability Testing,Portfolio Development',
    'Creatividad y pensamiento analítico,Conocimientos básicos de diseño,Computadora con software de diseño',
    'Sábados',
    '2024-02-10T09:00:00Z',
    '09:00 - 13:00',
    'Diseña experiencias que impacten',
    'UX/UI Design Bootcamp - Fin de Semana',
    240,
    3,
    3,
    NOW(),
    NOW()
),
(
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600',
    'Desarrollo full-stack con React y Node.js para crear aplicaciones web completas.',
    'Desarrollar aplicaciones full-stack,Integrar frontend y backend,Manejar bases de datos,Implementar autenticación,Desplegar aplicaciones',
    'React Hooks y Context,Estado global con Redux,Node.js y Express,Base de datos con PostgreSQL,Autenticación y seguridad,Testing integral,CI/CD y deployment',
    'Conocimientos de JavaScript,Experiencia básica con React,Familiaridad con Node.js',
    'Lunes a Viernes',
    '2024-04-01T14:00:00Z',
    '14:00 - 18:00',
    'De cero a full-stack developer',
    'Full-Stack Development Intensive',
    200,
    4,
    4,
    NOW(),
    NOW()
),
(
    'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=600',
    'Introducción práctica a Data Science y Machine Learning con Python.',
    'Analizar datos con Python,Crear modelos predictivos,Visualizar insights,Aplicar algoritmos de ML,Desarrollar proyectos reales',
    'Python para Data Science,Pandas y NumPy,Visualización con Matplotlib,Machine Learning con Scikit-learn,Deep Learning con TensorFlow,Proyectos aplicados,Presentación de resultados',
    'Conocimientos básicos de Python,Conceptos de matemáticas y estadística,Curiosidad por los datos',
    'Miércoles y Viernes',
    '2024-03-15T18:00:00Z',
    '18:00 - 20:30',
    'Transforma datos en decisiones',
    'Data Science & Machine Learning',
    180,
    5,
    5,
    NOW(),
    NOW()
);