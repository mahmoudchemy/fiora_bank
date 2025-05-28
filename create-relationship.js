import fetch from "node-fetch";

const API_ENDPOINT = "https://cloud.appwrite.io/v1";
const PROJECT_ID = "6834e763000edde2794a";
const API_KEY = "standard_42004043ac690aaa8054a1334859ab9e9664817b7b9c6c54eba717eca362f33337cc8b23e6d5aa624f1e94666c32a913a551f1ca49ae54ab77d7ced6119a60d18cdb99cc384ceee0cf1afd254af85101ced67bfe9b977565d6741e0e0cc3589428dbb54d5b7f8bfac20a30ce4ab9fdd0119df4d507a0e3ec682989fca414aca4";

const DATABASE_ID = "6834e99500220d47919b";
const COLLECTION_ID = "6834ea2a0004e49e1ae2"; // bank
const RELATED_COLLECTION_ID = "6834e9ba003617a36624"; // users

async function createRelationship() {
  const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/attributes/relationship`;

  const body = {
  key: "userId",
  required: false,
  relatedCollectionId: RELATED_COLLECTION_ID,
  type: "manyToOne"
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": PROJECT_ID,
        "X-Appwrite-Key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error ${res.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();
    console.log("✅ Relationship attribute created:", data);
  } catch (error) {
    console.error("❌ Error creating relationship attribute:", error.message);
  }
}

createRelationship();
