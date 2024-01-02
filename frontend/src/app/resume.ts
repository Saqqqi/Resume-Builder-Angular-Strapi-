export class Resume {
  summary(arg0: string, summary: any) {
    throw new Error('Method not implemented.');
  }
  id: string | undefined;
  profilePic: string | undefined;
  owner:string | null = null
  personalDetails: {
    name: string;
    designation:string;
    address: string;
    contactNo: string;
    email: string;
    linkedin: string;
    summary: string;
  } = {
    name: '',
    designation:'',
    address: '',
    contactNo: '',
    email: '',
    linkedin: '',
    summary: '',

  };
  experiences: Experience[] = [];
  educations: Education[] = [];
  languages: Language[] = [];
  skills: Skill[] = [];
}

   
                                                                                                 

  export class Experience {
    company_name: string = '';  
    job_title: string = '';
    job_description: string = '';
    startDate!: string;
    endDate!: string;
    experience: number = 0;
    currently_working: string = '';
  }

  export class Education {
    degree: string = '';
    institute: string = '';
    end_date!: string;
    start_date!: string;
    gpa!: number;
  }

  export class Language {
    name: string | undefined = '';
    id: any;
   
  }
  

  export class Skill {
    name: string | undefined = ''; // Change 'value' to 'name'
    id: any;
    value: any;
  }
  
