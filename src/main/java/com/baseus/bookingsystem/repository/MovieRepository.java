package com.baseus.bookingsystem.repository;

import com.baseus.bookingsystem.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

}
