declare module Survey.Forms {
    export interface ProjectForm extends Forms.CommentsForm, Forms.DueDateForm {
        service?: string;
    }

    export interface PowerPointProject extends ProjectForm {
        template?: string;
        style?: string;
        purpose?: string[];
    }

    export interface WritingProject extends ProjectForm {
        topic?: string;
        contents?: any[];
        content_comment?: string;
        files?: any[];
    }

    export interface DesignProject extends ProjectForm {
        design?: string;
        style?: string;
        files?: any[];
    }

    export interface DataEntryProject extends ProjectForm {
        description?: string;
    }

    export interface ResearchProject extends ProjectForm {
        description?: string;
        files?: any[];
    }

    export interface WebProject extends SurveyForm {
        website?: string;
        website_link?: string;
        service?: string | any[];
        tech_info?: string;
        tech_requirement?: string;
        tech_preferences?: string;
        purpose?: string;
        files?: any[];
        deadline?: Date | "no";
        start_date: string;
    }
}
