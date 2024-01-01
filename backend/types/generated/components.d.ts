import type { Schema, Attribute } from '@strapi/strapi';

export interface EducationEducation extends Schema.Component {
  collectionName: 'components_education_educations';
  info: {
    displayName: 'Education';
    description: '';
  };
  attributes: {
    institute: Attribute.String;
    degree: Attribute.String;
    gpa: Attribute.Integer;
    end_date: Attribute.Integer;
    start_date: Attribute.Integer;
  };
}

export interface ExperienceExperience extends Schema.Component {
  collectionName: 'components_experience_experiences';
  info: {
    displayName: 'experience';
    description: '';
  };
  attributes: {
    company_name: Attribute.String;
    job_description: Attribute.Text;
    job_title: Attribute.Text;
    startDate: Attribute.Date;
    endDate: Attribute.Date;
    currently_working: Attribute.String;
  };
}

export interface LanguageLanguage extends Schema.Component {
  collectionName: 'components_language_language_s';
  info: {
    displayName: 'language ';
    description: '';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface ProfileProfile extends Schema.Component {
  collectionName: 'components_profile_profiles';
  info: {
    displayName: 'profile';
    description: '';
  };
  attributes: {
    address: Attribute.Text;
    name: Attribute.Text;
    contactNo: Attribute.Integer;
    email: Attribute.Email;
    profile_picture: Attribute.Media;
    summary: Attribute.Text;
    linkedin: Attribute.String;
    designation: Attribute.String;
  };
}

export interface ProjectProject extends Schema.Component {
  collectionName: 'components_project_projects';
  info: {
    displayName: 'Project';
  };
  attributes: {
    project_name: Attribute.String;
    start_date: Attribute.Date;
    end_date: Attribute.DateTime;
    project_details: Attribute.Text;
    project_url: Attribute.String;
  };
}

export interface SkillSkill extends Schema.Component {
  collectionName: 'components_skill_skills';
  info: {
    displayName: 'Skill';
  };
  attributes: {
    name: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'education.education': EducationEducation;
      'experience.experience': ExperienceExperience;
      'language.language': LanguageLanguage;
      'profile.profile': ProfileProfile;
      'project.project': ProjectProject;
      'skill.skill': SkillSkill;
    }
  }
}
