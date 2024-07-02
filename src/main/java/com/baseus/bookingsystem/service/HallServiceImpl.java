package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.HallDto.HallActiveWithShowtimes;
import com.baseus.bookingsystem.dto.HallDto.HallCreateDto;
import com.baseus.bookingsystem.dto.HallDto.HallUpdateDto;
import com.baseus.bookingsystem.dto.ShowtimeDto.ShowtimeWithStartAndEndInfo;
import com.baseus.bookingsystem.entity.Hall;
import com.baseus.bookingsystem.entity.Seat;
import com.baseus.bookingsystem.entity.Showtime;
import com.baseus.bookingsystem.exception.APIException;
import com.baseus.bookingsystem.repository.HallRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class HallServiceImpl implements HallService{

    private HallRepository hallRepository;
    private EntityManager entityManager;

    @Transactional
    @Override
    public String save(HallCreateDto hallCreateDto) {
        Hall newHall = new Hall(hallCreateDto.getName(), hallCreateDto.getRowCount(), hallCreateDto.getColCount(), hallCreateDto.isActive());
        int rows = hallCreateDto.getRowCount();
        int cols = hallCreateDto.getColCount();
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                newHall.addSeat(new Seat(i, j));
            }
        }
        Hall savedHall = hallRepository.save(newHall);
        return "Successfully saved hall: " + savedHall.getId();
    }

    @Override
    public List<Hall> findAll() {
        return hallRepository.findAll();
    }

    @Override
    public Hall findById(int id) {
        return hallRepository.findById(id).orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "Hall with id" + id + " does not exist"));
    }

    @Transactional
    @Override
    public String delete(int id) {
        Hall hall = findById(id);
        List<Showtime> showtimes = hall.getShowTimes();
        if (!showtimes.isEmpty()) throw new APIException(HttpStatus.BAD_REQUEST, "Hall has existing showtimes. Suggest to set it to inactive!");
        hallRepository.delete(hall);
        return "hall with id: " + id + " is successfully deleted";
    }

    @Transactional
    @Override
    public String update(HallUpdateDto hallUpdateDto) {
        Hall toUpdateHall = findById(hallUpdateDto.getId());
        toUpdateHall.setName(hallUpdateDto.getName());
        toUpdateHall.setActive(hallUpdateDto.isActive());
        hallRepository.save(toUpdateHall);
        return "hall with id: " + toUpdateHall.getId() + " is successfully updated";
    }

    @Override
    public List<HallActiveWithShowtimes> findActiveHallsWithShowtimes() {
        TypedQuery<Hall> theQuery = entityManager.createQuery("SELECT h from Hall h LEFT JOIN FETCH h.showTimes st WHERE h.active = true", Hall.class);
        List<Hall> halls = theQuery.getResultList();
        List<HallActiveWithShowtimes> list = new ArrayList<>();
        for (Hall hall: halls) {
            List<Showtime> showtimes = hall.getShowTimes();
            List<ShowtimeWithStartAndEndInfo> formattedShowtimes = showtimes.stream().map(st -> new ShowtimeWithStartAndEndInfo(st.getTime(), st.getTime().plusMinutes(st.getMovie().getDuration()))).toList();
            HallActiveWithShowtimes currHall = new HallActiveWithShowtimes(hall.getId(), hall.getName(), formattedShowtimes);
            list.add(currHall);
        }
        return list;
    }
}
