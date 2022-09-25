import prisma from '$root/lib/prisma';
import { error, type Load } from '@sveltejs/kit';

export const load:Load = async({params})=> {
    const slug = params.slug
    const post = await prisma.post.findUnique({
        where:{
            slug
        }
    })
    return {
      title: post?.title,
      content: post?.content
    };
 
 
  //throw error(404, 'Not found');
}
