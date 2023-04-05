import { Association, District, Local } from "@prisma/client";

export type AssociationWithDependencies = Association & { districts: (District & { locals: Local[] })[] };
