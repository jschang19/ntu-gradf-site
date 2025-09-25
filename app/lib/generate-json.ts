import type { Program } from '~/types/program';
import formatProgramDisplayName from './format-programe-display-name';

export default function generateEducationalProgramJsonLd(program: Program) {
  const displayName = formatProgramDisplayName(program.name, program.group, program.identity);
  const fullProgramName = `國立臺灣大學${displayName}115年甄試招生`;

  // Build program prerequisites from application criteria and materials
  const prerequisites: string[] = [];
  if (program.application_criteria) {
    prerequisites.push(program.application_criteria);
  }
  if (program.application_materials && program.application_materials.length > 0) {
    prerequisites.push(...program.application_materials);
  }

  // Build occupational category from program name and group
  const occupationalCategory = program.group ? `${program.name} - ${program.group}` : program.name;

  // Build base provider object
  const baseProvider = {
    '@type': 'CollegeOrUniversity',
    'name': '國立臺灣大學',
    'alternateName': 'National Taiwan University',
    'url': 'https://www.aca.ntu.edu.tw/',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'No. 1, Sec. 4, Roosevelt Rd.',
      'addressLocality': 'Taipei',
      'addressRegion': 'Taiwan',
      'postalCode': '10617',
      'addressCountry': 'TW',
    },
  };

  // Add contact information if available using Object.assign
  const provider = program.phone
    ? Object.assign({}, baseProvider, { telephone: program.phone })
    : baseProvider;

  // Build base JSON-LD object
  const baseJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'EducationalOccupationalProgram',
    'name': fullProgramName,
    'description': `國立臺灣大學${displayName}115學年度碩士甄試招生之簡章，提供招生名額、申請條件、評選標準等完整資訊`,
    'provider': provider,
    'programType': 'Graduate Program',
    'educationalProgramMode': 'full-time',
    'educationalCredentialAwarded': {
      '@type': 'EducationalOccupationalCredential',
      'credentialCategory': '碩士學位 (Master\'s Degree)',
    },
    'maximumEnrollment': program.recruiting_num,
    'applicationStartDate': '2025-10-01', // Typical application start date for Taiwan graduate programs
    'applicationDeadline': '2025-10-09', // Typical deadline
    'occupationalCategory': occupationalCategory,
    'programPrerequisites': prerequisites.length > 0 ? prerequisites.join('; ') : '學士學位或同等學歷',
  };

  // Build additional properties using Object.assign
  const urlProperty = program.website ? { url: program.website } : {};

  const historicalProperty = program.historical_data && program.historical_data.length > 0
    ? {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          'name': '歷年錄取資訊',
          'description': `${program.historical_data[0].year}年申請人數: ${program.historical_data[0].application_num}, 錄取人數: ${program.historical_data[0].admission_num}, 錄取率: ${program.historical_data[0].recruiting_rate}%`,
        },
      ],
    }
    : {};

  // Combine all properties using Object.assign
  const jsonLd = Object.assign({}, baseJsonLd, urlProperty, historicalProperty);

  return jsonLd;
}
