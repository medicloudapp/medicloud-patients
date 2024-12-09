export interface Patient {
    id: number
    name: string
    lastname: string
    document: string
    birthdate: string
    address: string
    neighborhood: string
    email: string
    landline: string
    mobilePhone: string
    occupation: string
    documentType: DocumentType
    gender: Gender
    city: City
    zone: Zone
    maritalStatus: MaritalStatus
    membershipType: MembershipType
    membershipLevel: MembershipLevel
    regime: Regime
    educationalLevel: EducationalLevel
    socioeconomicLevel: SocioeconomicLevel
    protocol: Protocol
    researchPatient: ResearchPatient
    status: number
    technologies: Technology[]
    disabilities: Disability[]
    entities: Entity[]
    companionPerson: string
    companionPersonPhone: string
    relationship: Relationship
    comprehensivePrograms: ComprehensiveProgram[]
    usersstatus: Usersstatus
  }
  
  export interface DocumentType {
    id: number
    name: string
  }
  
  export interface Gender {
    id: number
    description: string
  }
  
  export interface City {
    id: number
    name: string
    departmentId: number
    code: string | null
  }
  
  export interface Zone {
    id: number
    description: string
  }
  
  export interface MaritalStatus {
    id: number
    description: string
  }
  
  export interface MembershipType {
    id: number
    description: string
  }
  
  export interface MembershipLevel {
    id: number
    description: string
  }
  
  export interface Regime {
    id: number
    name: string
  }
  
  export interface EducationalLevel {
    id: number
    description: string
  }
  
  export interface SocioeconomicLevel {
    id: number
    description: string
  }
  
  export interface Protocol {
    id: number
    name: string
  }
  
  export interface ResearchPatient {
    id: number
    value: boolean
  }
  
  export interface Technology {
    id: number
    name: string
  }
  
  export interface Disability {
    id: number
    name: string
  }
  
  export interface Entity {
    id: number
    name: string
  }
  
  export interface Relationship {
    id: number
    description: string
  }
  
  export interface ComprehensiveProgram {
    id: number
    programId: number
    admissionDate: string
    dischargeDate: string
    reasonDischargeId: number
    cost: number
  }
  
  export interface Usersstatus {
    id: number
    description: string
  }