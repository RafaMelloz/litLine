import { auth } from '@/services/auth';
import prisma from '@/services/database';
import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: Request){
    const session = await auth()
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const description = formData.get('description') as string
    const image = formData.get('file') as Blob | null;

    if (!image) {
        return NextResponse.json({ message: 'Image is required' }, { status: 400 });
    }

    const fileBuffer = await image.arrayBuffer();
    const fileStream = Buffer.from(fileBuffer);
    let urlImage = "";

    try {
        if (image) {
            urlImage = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream({ resource_type: "auto", public_id: `book of ${title}` },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result?.secure_url || '');
                        }
                    }).end(fileStream);
            });
        }

        await prisma.books.create({
            data:{
                title,
                author,
                description,
                image : urlImage as string ,
                ownerId: session.user?.id
            }
        })

        return NextResponse.json({ message: 'ok' }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: 'erro ao cadastrar' })
    }
}

export async function DELETE(req: Request){
    const session = await auth()
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
        return NextResponse.json({ message: 'Id is required' }, { status: 400 });
    }

    try {
        await prisma.books.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: 'ok' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'erro ao deletar' })
    }
}