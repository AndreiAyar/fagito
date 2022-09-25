
import prisma from '$root/lib/prisma';
import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const {slug} = params;
    const searchTerm = slug.split('/').join(' ')
    const result = await prisma.user.findMany({
        where:{
            body:{
                search:'sal'
            }
        }
        
      })
    console.log('result',result)
    return {
        searchTerm
    }
//   throw error(404, 'Not found');
}