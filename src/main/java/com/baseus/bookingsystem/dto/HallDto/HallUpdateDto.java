package com.baseus.bookingsystem.dto.HallDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HallUpdateDto {
    private int id;
    private String name;
    private boolean active;
}
