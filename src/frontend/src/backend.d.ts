import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Struct {
    id: bigint;
    title: string;
    year: bigint;
    description: string;
    awardBody: string;
    category: string;
}
export type Time = bigint;
export interface Struct__6 {
    id: bigint;
    inquiryType: Type__1;
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
    organization: string;
}
export interface Struct__4 {
    id: bigint;
    issueDate: Time;
    certName: string;
    description: string;
    isVerified: boolean;
    credentialId: string;
    requirements: string;
    recipientName: string;
}
export interface Struct__3 {
    id: bigint;
    status: Status;
    description: string;
    customRequirements: string;
    companyName: string;
    programTitle: string;
}
export interface Struct__2 {
    id: bigint;
    title: string;
    duration: bigint;
    description: string;
    level: string;
    isCorporateCustomizable: boolean;
    category: Category;
    corporateAlignment: string;
}
export interface Session {
    id: bigint;
    messages: Array<Message>;
    recommendations: Array<string>;
    sessionId: string;
}
export interface Struct__5 {
    id: bigint;
    expiryDate?: Time;
    description: string;
    dateGranted: Time;
    bodyName: string;
    accreditationType: string;
}
export interface Message {
    content: string;
    role: string;
}
export interface Struct__1 {
    id: bigint;
    title: string;
    publishedDate: Time;
    type: Type;
    authorName: string;
    downloadUrl: string;
    abstract: string;
}
export interface UserProfile {
    name: string;
}
export enum Category {
    serviceTraining = "serviceTraining",
    leadership = "leadership",
    businessTransformation = "businessTransformation",
    professionalDevelopment = "professionalDevelopment",
    aiSkills = "aiSkills"
}
export enum Status {
    active = "active",
    completed = "completed",
    inquiry = "inquiry"
}
export enum Type {
    orange = "orange",
    white = "white",
    intelligence = "intelligence"
}
export enum Type__1 {
    courseCustomization = "courseCustomization",
    corporatePartnership = "corporatePartnership",
    enrollment = "enrollment",
    general = "general"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAIAdvisorMessage(sessionId: bigint, message: Message): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAIAdvisorSession(sessionId: string): Promise<bigint>;
    createAccreditation(accreditation: Struct__5): Promise<bigint>;
    createCertification(certification: Struct__4): Promise<bigint>;
    createCorporateProgram(program: Struct__3): Promise<bigint>;
    createCourse(course: Struct__2): Promise<bigint>;
    createPublication(publication: Struct__1): Promise<bigint>;
    createRecognition(recognition: Struct): Promise<bigint>;
    deleteAccreditation(id: bigint): Promise<void>;
    deleteCertification(id: bigint): Promise<void>;
    deleteCorporateProgram(id: bigint): Promise<void>;
    deleteCourse(id: bigint): Promise<void>;
    deleteInquiry(id: bigint): Promise<void>;
    deletePublication(id: bigint): Promise<void>;
    deleteRecognition(id: bigint): Promise<void>;
    getAIAdvisorSession(sessionId: bigint): Promise<Session | null>;
    getAccreditation(id: bigint): Promise<Struct__5 | null>;
    getAllAccreditations(): Promise<Array<Struct__5>>;
    getAllCertifications(): Promise<Array<Struct__4>>;
    getAllCorporatePrograms(): Promise<Array<Struct__3>>;
    getAllCourses(): Promise<Array<Struct__2>>;
    getAllInquiries(): Promise<Array<Struct__6>>;
    getAllPublications(): Promise<Array<Struct__1>>;
    getAllRecognitions(): Promise<Array<Struct>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCertification(id: bigint): Promise<Struct__4 | null>;
    getCertificationsByRecipient(recipientName: string): Promise<Array<Struct__4>>;
    getCorporateCustomizableCourses(): Promise<Array<Struct__2>>;
    getCorporateProgram(id: bigint): Promise<Struct__3 | null>;
    getCourse(id: bigint): Promise<Struct__2 | null>;
    getInquiry(id: bigint): Promise<Struct__6 | null>;
    getPublication(id: bigint): Promise<Struct__1 | null>;
    getPublicationByType(pubType: Type): Promise<Array<Struct__1>>;
    getRecognition(id: bigint): Promise<Struct | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitInquiry(inquiry: Struct__6): Promise<bigint>;
    updateAIAdvisorRecommendations(sessionId: bigint, recommendations: Array<string>): Promise<void>;
    updateAccreditation(id: bigint, accreditation: Struct__5): Promise<void>;
    updateCertification(id: bigint, certification: Struct__4): Promise<void>;
    updateCorporateProgram(id: bigint, program: Struct__3): Promise<void>;
    updateCorporateProgramStatus(id: bigint, status: Status): Promise<void>;
    updateCourse(id: bigint, course: Struct__2): Promise<void>;
    updatePublication(id: bigint, publication: Struct__1): Promise<void>;
    updateRecognition(id: bigint, recognition: Struct): Promise<void>;
    uploadCourseMaterial(courseId: bigint, filePath: string): Promise<void>;
}
