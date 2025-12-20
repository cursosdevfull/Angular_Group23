import { Injectable, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { delay, Observable, of, switchMap, merge } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CourseService {
    private readonly pageSize = 18;
    data = [
        // Frontend Courses
        { id: 1, title: 'HTML5 Semántico y Accesibilidad Web' },
        { id: 2, title: 'CSS3 Avanzado y Flexbox/Grid' },
        { id: 3, title: 'JavaScript ES6+ Fundamentals' },
        { id: 4, title: 'TypeScript para Desarrollo Web' },
        { id: 5, title: 'React.js - Hooks y Context API' },
        { id: 6, title: 'Vue.js 3 - Composition API' },
        { id: 7, title: 'Angular 18 - Signals y Control Flow' },
        { id: 8, title: 'Next.js - Full Stack React Framework' },
        { id: 9, title: 'Svelte y SvelteKit' },
        { id: 10, title: 'Tailwind CSS - Utility-First Framework' },
        { id: 11, title: 'Webpack y Vite - Module Bundlers' },
        { id: 12, title: 'Testing Frontend con Jest y Cypress' },
        { id: 13, title: 'PWA - Progressive Web Apps' },
        { id: 14, title: 'Micro-frontends con Module Federation' },
        { id: 15, title: 'Web Performance Optimization' },

        // Backend Courses
        { id: 16, title: 'Node.js - APIs REST con Express' },
        { id: 17, title: 'Python Django - Framework Web' },
        { id: 18, title: 'FastAPI - APIs modernas con Python' },
        { id: 19, title: 'Java Spring Boot - Microservicios' },
        { id: 20, title: 'C# .NET Core - Web APIs' },
        { id: 21, title: 'Go - Desarrollo de APIs Concurrentes' },
        { id: 22, title: 'Rust - Sistemas de Alto Rendimiento' },
        { id: 23, title: 'GraphQL con Apollo Server' },
        { id: 24, title: 'Bases de Datos PostgreSQL Avanzado' },
        { id: 25, title: 'MongoDB - Base de Datos NoSQL' },
        { id: 26, title: 'Redis - Cache y Session Store' },
        { id: 27, title: 'Docker - Containerización de Aplicaciones' },
        { id: 28, title: 'Kubernetes - Orquestación de Contenedores' },
        { id: 29, title: 'Microservicios - Arquitectura Distribuida' },
        { id: 30, title: 'Event-Driven Architecture con RabbitMQ' },

        // Infrastructure as Code (IaC)
        { id: 31, title: 'Terraform - Infraestructura como Código' },
        { id: 32, title: 'Ansible - Automatización de Configuraciones' },
        { id: 33, title: 'Pulumi - IaC con Lenguajes de Programación' },
        { id: 34, title: 'AWS CloudFormation - Templates' },
        { id: 35, title: 'Azure ARM Templates' },
        { id: 36, title: 'Google Cloud Deployment Manager' },
        { id: 37, title: 'Helm Charts para Kubernetes' },
        { id: 38, title: 'GitOps con ArgoCD y Flux' },
        { id: 39, title: 'Vagrant - Ambientes de Desarrollo' },
        { id: 40, title: 'Packer - Automatización de Imágenes' },
        { id: 41, title: 'Chef - Configuration Management' },
        { id: 42, title: 'Puppet - Infrastructure Automation' },
        { id: 43, title: 'SaltStack - Remote Execution' },
        { id: 44, title: 'Crossplane - Cloud Native IaC' },
        { id: 45, title: 'CDK - Cloud Development Kit' },

        // Cloud Courses
        { id: 46, title: 'AWS Solutions Architect Associate' },
        { id: 47, title: 'Azure Fundamentals AZ-900' },
        { id: 48, title: 'Google Cloud Platform - Core Services' },
        { id: 49, title: 'AWS Lambda - Serverless Computing' },
        { id: 50, title: 'Azure Functions - Event-Driven Computing' },
        { id: 51, title: 'Google Cloud Functions' },
        { id: 52, title: 'AWS EKS - Kubernetes en la Nube' },
        { id: 53, title: 'Azure Kubernetes Service (AKS)' },
        { id: 54, title: 'Google Kubernetes Engine (GKE)' },
        { id: 55, title: 'Multi-Cloud Strategy y Hybrid Cloud' },
        { id: 56, title: 'Cloud Security Best Practices' },
        { id: 57, title: 'Cloud Cost Optimization' },
        { id: 58, title: 'Monitoring y Observabilidad en Cloud' },
        { id: 59, title: 'Disaster Recovery en la Nube' },
        { id: 60, title: 'Cloud Native Architecture Patterns' }
    ];

    currentPage = signal<number>(1);
    private refreshTrigger = signal<number>(0);

    obs = merge(toObservable(this.currentPage), toObservable(this.refreshTrigger)).pipe(
        switchMap(() => {
            return this.loadCoursesPage(this.currentPage());
        }),
        delay(1000)
    )
    listCourses = toSignal(this.obs, { initialValue: { data: [], hasMore: false } });

    loadCoursesPage(page: number): Observable<{ data: any[], hasMore: boolean }> {
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize + 1;
        const pageData = this.data.slice(startIndex, endIndex);

        let hasMore = false;
        if (pageData.length > this.pageSize) {
            hasMore = true;
            pageData.pop();
        }

        return of({ data: pageData, hasMore })
    }

    update(id: number, title: string) {
        const index = this.data.findIndex(c => c.id === id);
        if (index !== -1) {
            console.log('Updating course id', id, 'with title', title);
            this.data = this.data.map(course =>
                course.id === id ? { ...course, title } : course
            );
            this.refreshTrigger.set(this.refreshTrigger() + 1);
        }
    }

    create(title: string) {
        const newId = this.data.length ? Math.max(...this.data.map(c => c.id)) + 1 : 1;
        const newCourse = { id: newId, title };
        this.data = [...this.data, newCourse];
        this.refreshTrigger.set(this.refreshTrigger() + 1);
    }

    remove(id: number) {
        this.data = this.data.filter(c => c.id !== id);
        this.refreshTrigger.set(this.refreshTrigger() + 1);
    }
}