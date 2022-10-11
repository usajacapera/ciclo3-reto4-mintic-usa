package com.usa.g36eq9.service;

import com.usa.g36eq9.model.Reservation;
import com.usa.g36eq9.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }
    public Optional<Reservation> getReservation(int idReservation){
        return reservationRepository.getReservation(idReservation);
    }
    public Reservation save(Reservation r){
        if(r.getIdReservation() == null){
            return reservationRepository.save(r);
        }else{
            Optional<Reservation> raux = reservationRepository.getReservation(r.getIdReservation());
            if(raux.isPresent()){
                return r;
            }else{
                return reservationRepository.save(r);
            }
        }
    }
    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation() != null){
            Optional<Reservation> q = reservationRepository.getReservation(reservation.getIdReservation());
            if(q.isPresent()){
                if(reservation.getStartDate() != null){
                    q.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate() != null){
                    q.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getBoat() != null){
                    q.get().setBoat(reservation.getBoat());
                }
                if(reservation.getClient() != null){
                    q.get().setClient(reservation.getClient());
                }
                reservationRepository.save(q.get());
                return q.get();
            }else{
                return reservation;
            }
        }else{
            return reservation;
        }
    }
    public boolean delete(int idReservation){
        boolean flag = false;
        Optional<Reservation> reservation = reservationRepository.getReservation(idReservation);
        if(reservation.isPresent()){
            reservationRepository.delete(reservation.get());
            flag = true;
        }
        return flag;
    }

}
