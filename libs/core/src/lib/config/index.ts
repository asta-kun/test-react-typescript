const stage = process.env['NEXT_PUBLIC_STAGE'] as string;

export const isDevelopment = ['dev'].includes(stage);
export const isStaging = ['stg'].includes(stage);
export const isProduction = ['prod'].includes(stage);
export const processHash = process.env['NX_TASK_HASH']?.substring(0, 10);
