const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedFile) {
    alert('No file selected');
    return;
  }

  setLoading(true);

  // Step 1: Upload the file to Firebase
  const storageRef = ref(storage, `wallpapers/${selectedFile.name}`);
  try {
    await uploadBytes(storageRef, selectedFile);
    const downloadURL = await getDownloadURL(storageRef); // Get the download URL after upload

    // Step 2: Prepare data to send to Django using FormData
    const formData = {
      image: downloadURL, // Use the download URL obtained from Firebase
      title,
      description,
      tags,
    };

    console.log('Data to be sent to backend:', formData);

    // Step 3: Send the data to your Django backend
    const response = await fetch('https://walli-django-production.up.railway.app/api/wallpapers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Keep this as JSON
      },
      body: JSON.stringify(formData), // Send as JSON
    });

    if (response.status === 401) {
      alert('You are not authorized. Please log in again.');
      localStorage.removeItem('token');
      navigate('/signin');
    } else if (response.ok) {
      alert('Image uploaded successfully!');
      navigate('/');
    } else {
      const errorData = await response.json();
      alert('Error uploading image: ' + JSON.stringify(errorData));
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('An error occurred: ' + error.message);
  } finally {
    setLoading(false);
  }
};
