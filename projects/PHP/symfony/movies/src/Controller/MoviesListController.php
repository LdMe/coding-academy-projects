<?php

namespace App\Controller;

use App\Entity\MoviesList;
use App\Entity\Movie;
use App\Form\ListFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MoviesListController extends AbstractController
{
    /**
     * @Route("/favorites", name="movies_list")
     */
    public function index()
    {
        return $this->render('movies_list/index.html.twig', [
            'controller_name' => 'MoviesListController',
        ]);
    }
    /**
     * @Route("/favorites/new", name="movies_list_new")
     */
    public function register(Request $request):Response
    {
    	$lista= new MoviesList();
        $movie_id=$request->query->get("movie_id");
        if($movie_id != null){
            $movie=$this->getDoctrine()->getRepository(Movie::class)->find($movie_id);
            if($movie!=null){

                $lista->addMovie($movie);
            }
        }
    	$form = $this->createForm(ListFormType::class, $lista);
    	$form->handleRequest($request);
    	if ($form->isSubmitted() && $form->isValid()) {
    		$exists=false;
    		foreach ($this->getUser()->getLists() as  $list) {
    			if($list->getName()==$form->get('name')->getData()) {
    				$exists =true;
    			}
    		}
    		if(! $exists) {
    			$lista->setName($form->get('name')->getData());
        		$lista->addUser($this->getUser());
        		$entityManager = $this->getDoctrine()->getManager();
        		
                $entityManager->persist($lista);
                $entityManager->flush();
    		}
    		return $this->redirectToRoute("app_index",["statusCode"=>301]);
    	}
    	return $this->render('movies_list/index.html.twig', [
            'listCreateForm' => $form->createView(),
        ]);
    }
    public function remove(Request $request):Response
    {
        $title= $_POST["title"];
        $repo= $this->getDoctrine()->getRepository(MoviesList::class);
        $moviesList= $repo->findOneBy(['name' =>$content["name"]]);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($lista);
        $entityManager->flush();
    }
}
