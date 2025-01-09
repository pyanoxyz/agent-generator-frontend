import { Character } from "../components/Agents/agents";
import { API_BASE_URL } from "./agents";


interface UpdateCharacterKeyResponse {
  update: {
    [key: string]: string;  
  };
}

export const updateCharacterKey = async (
  character: Character,
  key: string,
  prompt: string
): Promise<string[]> => {  
  try {
    // Create FormData object
    const formData = new FormData();
    
    formData.append('prompt', prompt);
    formData.append('update_key', key);
    
    const characterBlob = new Blob([JSON.stringify(character)], { type: 'application/json' });
    formData.append('character', characterBlob, 'character.json');

    const response = await fetch(`${API_BASE_URL}/edit_character`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update character key');
    }

    const data: UpdateCharacterKeyResponse = await response.json();
    
    try {
      const parsedArray = JSON.parse(data.update[key]);
      return Array.isArray(parsedArray) ? parsedArray : [];
    } catch (parseError) {
      console.error('Failed to parse response array:', parseError);
      return [];
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update character key');
  }
};