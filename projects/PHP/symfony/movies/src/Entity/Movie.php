<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


/**
 * @ORM\Entity(repositoryClass="App\Repository\MovieRepository")
  * @Vich\Uploadable
 */
class Movie
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Title;

    /**
     * @ORM\Column(type="string", length=1024, nullable=true)
     */
    private $summary;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $year;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $image;
    
    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\MoviesList", mappedBy="movies")
     */
    private $lists;

    public function __construct()
    {
        $this->Lists = new ArrayCollection();
        $this->lists = new ArrayCollection();
    }
    public function setImageFile(File $image = null) {
        $this->imageFile = $image;
        if($image) {
            $this->setImage($this->getImage());
        }
    }
    public function __toString() {
        return $this->Title;
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->Title;
    }

    public function setTitle(string $Title): self
    {
        $this->Title = $Title;

        return $this;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(?string $summary): self
    {
        $this->summary = $summary;

        return $this;
    }

    public function getYear(): ?\DateTimeInterface
    {
        return $this->year;
    }

    public function setYear(?\DateTimeInterface $year): self
    {
        $this->year = $year;

        return $this;
    }

  

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return Collection|MoviesList[]
     */
    public function getLists(): Collection
    {
        return $this->lists;
    }

    public function addList(MoviesList $list): self
    {
        if (!$this->lists->contains($list)) {
            $this->lists[] = $list;
            $list->addMovie($this);
        }

        return $this;
    }

    public function removeList(MoviesList $list): self
    {
        if ($this->lists->contains($list)) {
            $this->lists->removeElement($list);
            $list->removeMovie($this);
        }

        return $this;
    }
}
