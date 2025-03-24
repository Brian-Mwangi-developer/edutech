// lib/azureSearch.ts
import {
  SearchClient,
  AzureKeyCredential,
} from "@azure/search-documents";

interface SearchDocument {
  id:string;
  documentContent: string;
  documentName: string;
  documentId: string;
  sectionOrder: number;
}

const serviceName = process.env.AZURE_SEARCH_SERVICE_NAME!;
const apiKey = process.env.AZURE_SEARCH_API_KEY!;
const indexName = process.env.AZURE_SEARCH_INDEX_NAME!;

const endpoint = `https://${serviceName}.search.windows.net`;

const credential = new AzureKeyCredential(apiKey);
export const searchClient = new SearchClient(endpoint, indexName, credential);

export async function uploadSectionsToAzureSearch(
  sections: { documentId: number; content: string; order: number; documentName: string }[]
) {
  // Transform the documents to match the Azure Search index schema
  const azureDocuments = sections.map((section) => {
    return {
      // Use the required "id" field that exists in your index
      id: `${section.documentId}_${section.order}`,
      documentName: section.documentName,
      documentContent: section.content,
      documentId: section.documentId.toString(),
      sectionOrder: section.order
    };
  });

  try {
    // Upload documents in a batch
    const result = await searchClient.uploadDocuments(azureDocuments);
    return result;
  } catch (error) {
    console.error("Azure Search Upload Error:", error);
    throw error;
  }
}


export async function queryDocumentContent(documentName: string, userQuery: string): Promise<string | null> {
  try {
    const escapedDocName = documentName.replace(/'/g, "''");

    const searchResults = await searchClient.search(userQuery, {
      filter: `documentName eq '${escapedDocName}'`,
      select: ["documentContent"],
      searchFields: ["documentContent"],
      top: 5,
      includeTotalCount: true
    });

    const contents: string[] = [];
    for await (const result of searchResults.results) {
      const content = (result.document as SearchDocument).documentContent;
      if (content) {
        contents.push(content);
      }
    }

    return contents.length > 0 ? contents.join('\n\n') : null;
  } catch (error) {
    console.error("Azure Search Query Error:", error);
    return null;
  }
}