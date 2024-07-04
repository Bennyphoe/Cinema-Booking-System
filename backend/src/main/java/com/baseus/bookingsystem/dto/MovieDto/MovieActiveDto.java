package com.baseus.bookingsystem.dto.MovieDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MovieActiveDto {
    private int id;
    private String name;
    private int duration;
}
