

// Uncomment if you want to use Azure Search
/*
// Prepare sections for Azure Search upload
const azureSections = newDocument.sections.map((sec) => ({
  key: `${newDocument.id}_${sec.order}`,
  documentId: newDocument.id,
  content: sec.content,
  order: sec.order,
}));

// Upload sections to Azure Search
const azureResult = await uploadSectionsToAzureSearch(azureSections);
console.log("Azure Search upload result:", azureResult);
*/