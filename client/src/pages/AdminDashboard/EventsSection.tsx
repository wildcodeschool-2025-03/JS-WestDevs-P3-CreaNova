import { type ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 500 * 1024) {
        toast.error("La taille de l'image ne doit pas être supérieur à 500ko");
        e.target.value = "";
        setFile(undefined);
        return;
      }
      setFile(selectedFile);
    }
  };
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/events", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!file && selectedEvent?.image) {
      formData.set("image", selectedEvent.image);
    } else if (file) {
      formData.set("image", file);
    }

    fetch(`http://localhost:3310/api/admin/event/${selectedEvent?.id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    setModalOpen(false);
  };

  if (!events) {
    return <h1>Aucun événement</h1>;
  }
  return (
    <section className="events-section-admin-dashboard">
      <h2>Événements</h2>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Date</th>
            <th>Description</th>
            <th>Image</th>
            <th>Editer</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td>{event.text}</td>
              <td>
                <img
                  src={`http://localhost:3310/${event.image}`}
                  alt={event.title}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="not-delete-cancel-button"
                  onClick={() => openModal(event)}
                >
                  Editer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && selectedEvent && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Titre:</label>
            <input name="title" defaultValue={selectedEvent.title} />
            <label htmlFor="image">Image:</label>
            <input name="image" type="file" onChange={handleFile} />
            {file && (
              <>
                <p> Nom : {file.name}</p>
                <p>Taille : {file.size} bytes</p>
              </>
            )}
            <label htmlFor="text">Description:</label>
            <textarea name="text" defaultValue={selectedEvent.text} />
            <label htmlFor="date">Date:</label>
            <input name="date" defaultValue={selectedEvent.date} />
            <button type="submit" className="not-delete-cancel-button">
              Enregistrer
            </button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Annuler
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default EventsSection;
