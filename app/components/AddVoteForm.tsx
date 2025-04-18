'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface VoteObject {
  id?: number;
  name: string;
  description: string;
  image: File | string | null;
}

interface ExistingObject {
  id: number;
  name: string;
  description: string;
  image: string;
}

export default function AddVoteForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingObjects, setExistingObjects] = useState<ExistingObject[]>([]);
  const [imagePreviews, setImagePreviews] = useState({
    object1: '',
    object2: ''
  });
  const [formData, setFormData] = useState({
    type: 'celebrity',
    object1: {
      name: '',
      description: '',
      image: null,
      isExisting: false,
      existingId: null as number | null
    } as VoteObject & { isExisting: boolean; existingId: number | null },
    object2: {
      name: '',
      description: '',
      image: null,
      isExisting: false,
      existingId: null as number | null
    } as VoteObject & { isExisting: boolean; existingId: number | null }
  });

  useEffect(() => {
    const fetchExistingObjects = async () => {
      try {
        const response = await fetch(`/api/objects?type=${formData.type}`);
        if (response.ok) {
          const data = await response.json();
          setExistingObjects(data);
        }
      } catch (error) {
        console.error('Error fetching existing objects:', error);
      }
    };

    fetchExistingObjects();
  }, [formData.type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate form data
      if (!formData.type) {
        throw new Error('Please select a vote type');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('type', formData.type);

      // Validate and handle object 1
      if (formData.object1.isExisting) {
        if (!formData.object1.existingId) {
          throw new Error('Please select an existing item for the first item');
        }
        formDataToSend.append('object1[existingId]', formData.object1.existingId.toString());
      } else {
        if (!formData.object1.name.trim()) {
          throw new Error('Please enter a name for the first item');
        }
        if (!formData.object1.description.trim()) {
          throw new Error('Please enter a description for the first item');
        }
        if (!formData.object1.image) {
          throw new Error('Please select an image for the first item');
        }
        formDataToSend.append('object1[name]', formData.object1.name.trim());
        formDataToSend.append('object1[description]', formData.object1.description.trim());
        if (formData.object1.image instanceof File) {
          formDataToSend.append('object1[image]', formData.object1.image);
        }
      }

      // Validate and handle object 2
      if (formData.object2.isExisting) {
        if (!formData.object2.existingId) {
          throw new Error('Please select an existing item for the second item');
        }
        formDataToSend.append('object2[existingId]', formData.object2.existingId.toString());
      } else {
        if (!formData.object2.name.trim()) {
          throw new Error('Please enter a name for the second item');
        }
        if (!formData.object2.description.trim()) {
          throw new Error('Please enter a description for the second item');
        }
        if (!formData.object2.image) {
          throw new Error('Please select an image for the second item');
        }
        formDataToSend.append('object2[name]', formData.object2.name.trim());
        formDataToSend.append('object2[description]', formData.object2.description.trim());
        if (formData.object2.image instanceof File) {
          formDataToSend.append('object2[image]', formData.object2.image);
        }
      }

      // Make the API request
      const response = await fetch('/api/votes', {
        method: 'POST',
        body: formDataToSend,
      });

      // Handle the response
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.details) {
          throw new Error(`Server error: ${errorData.details}`);
        }
        throw new Error(errorData.error || 'Failed to create vote. Please try again.');
      }

      // Clean up image preview URLs
      Object.values(imagePreviews).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });

      // Navigate back to home page after successful creation
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error adding vote:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleObjectChange = (objectKey: 'object1' | 'object2', field: keyof VoteObject, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [objectKey]: {
        ...prev[objectKey],
        [field]: value
      }
    }));
  };

  const handleImageChange = (objectKey: 'object1' | 'object2', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleObjectChange(objectKey, 'image', file);
      
      // Create preview URL for the new image
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews(prev => ({
        ...prev,
        [objectKey]: previewUrl
      }));
    }
  };

  const handleExistingObjectSelect = (objectKey: 'object1' | 'object2', object: ExistingObject) => {
    setFormData(prev => ({
      ...prev,
      [objectKey]: {
        ...prev[objectKey],
        isExisting: true,
        existingId: object.id,
        name: object.name,
        description: object.description,
        image: object.image
      }
    }));

    // Set preview for existing object
    setImagePreviews(prev => ({
      ...prev,
      [objectKey]: object.image
    }));
  };

  const handleNewObject = (objectKey: 'object1' | 'object2') => {
    setFormData(prev => ({
      ...prev,
      [objectKey]: {
        name: '',
        description: '',
        image: null,
        isExisting: false,
        existingId: null
      }
    }));

    // Clear preview when switching to new object
    setImagePreviews(prev => ({
      ...prev,
      [objectKey]: ''
    }));
  };

  // Cleanup function for image preview URLs
  useEffect(() => {
    return () => {
      // Revoke the URLs when component unmounts
      Object.values(imagePreviews).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imagePreviews]);

  const renderObjectForm = (objectKey: 'object1' | 'object2') => {
    const object = formData[objectKey];
    const isExisting = object.isExisting;
    const previewUrl = imagePreviews[objectKey];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-black">
          {objectKey === 'object1' ? 'First' : 'Second'} {formData.type === 'celebrity' ? 'Celebrity' : 'TV Show'}
        </h3>

        <div className="mb-4">
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => handleNewObject(objectKey)}
              className={`px-4 py-2 rounded ${
                !isExisting ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              New
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                [objectKey]: { ...prev[objectKey], isExisting: true }
              }))}
              className={`px-4 py-2 rounded ${
                isExisting ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Existing
            </button>
          </div>

          {isExisting ? (
            <div className="space-y-4">
              <select
                value={object.existingId || ''}
                onChange={(e) => {
                  const selectedObject = existingObjects.find(obj => obj.id === parseInt(e.target.value));
                  if (selectedObject) {
                    handleExistingObjectSelect(objectKey, selectedObject);
                  }
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                required
                disabled={isLoading}
              >
                <option value="">Select an existing {formData.type}</option>
                {existingObjects.map(obj => (
                  <option key={obj.id} value={obj.id}>
                    {obj.name}
                  </option>
                ))}
              </select>
              {previewUrl && (
                <div className="mt-4">
                  <div className="relative h-64 w-full">
                    <Image
                      src={previewUrl}
                      alt={object.name}
                      fill
                      className="object-contain rounded-md"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{object.description}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div>
                <label htmlFor={`${objectKey}-name`} className="block text-sm font-medium text-black">
                  Name
                </label>
                <input
                  type="text"
                  id={`${objectKey}-name`}
                  value={object.name}
                  onChange={(e) => handleObjectChange(objectKey, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor={`${objectKey}-description`} className="block text-sm font-medium text-black">
                  Description
                </label>
                <textarea
                  id={`${objectKey}-description`}
                  value={object.description}
                  onChange={(e) => handleObjectChange(objectKey, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                  rows={3}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor={`${objectKey}-image`} className="block text-sm font-medium text-black">
                  Image
                </label>
                <input
                  type="file"
                  id={`${objectKey}-image`}
                  accept="image/*"
                  onChange={(e) => handleImageChange(objectKey, e)}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  required
                  disabled={isLoading}
                />
                {previewUrl && (
                  <div className="mt-4">
                    <div className="relative h-64 w-full">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-contain rounded-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black">Create New Vote</h2>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600"
        >
          Back to Votes
        </Link>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-black">
            Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            disabled={isLoading}
          >
            <option value="celebrity">Celebrity</option>
            <option value="tvshow">TV Show</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderObjectForm('object1')}
          {renderObjectForm('object2')}
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Vote'}
          </button>
        </div>
      </form>
    </div>
  );
} 