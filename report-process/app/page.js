import Image from 'next/image'

export default function Home() {

  async function create(formData) {
    'use server'
    // const file = formData.get('myfile');
    console.log('file>> ', formData)
    const res = await fetch("http://localhost:3000/api/uploads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // console.log('app route:>>> \n', res, '<<<<<<<<<<<<<<<<');
  }

  return (
    <div>
      <form action={create}>
        <div>
          <input type="file" name="myfile" required />
        </div>
        <div>
          <input type="submit" value="Upload" />
        </div>
      </form>
    </div>
  )
}
