package com.usa.g36eq9.service;

import com.usa.g36eq9.model.Boat;
import com.usa.g36eq9.repository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class BoatService {
    @Autowired
    private BoatRepository boatRepository;

    public List<Boat> getAll(){
        return boatRepository.getAll();
    }

    public Optional<Boat> getBoat(int id){
        return boatRepository.getBoat(id);
    }

    public Boat save(Boat b){
        if(b.getId() == null){
            return boatRepository.save(b);
        }else{
            Optional<Boat> baux = boatRepository.getBoat(b.getId());
            if(baux.isPresent()){
                return b;
            }else{
                return boatRepository.save(b);
            }
        }

    }
    public Boat update(Boat b){
        if(b.getId() != null){
            Optional<Boat> q = boatRepository.getBoat(b.getId());
            if(q.isPresent()){
                if(b.getName() != null){
                    q.get().setName(b.getName());
                }
                if(b.getBrand() != null){
                    q.get().setBrand(b.getBrand());
                }
                if(b.getYear() != null){
                    q.get().setYear(b.getYear());
                }
                if(b.getDescription() != null){
                    q.get().setDescription(b.getDescription());
                }
                if(b.getCategory() != null){
                    q.get().setCategory(b.getCategory());
                }
                boatRepository.save(q.get());
                return q.get();
            }else{
                return b;
            }
        }else{
            return b;
        }
    }
    public boolean delete(int id){
        boolean flag = false;
        Optional<Boat> b = boatRepository.getBoat(id);
        if(b.isPresent()){
            boatRepository.delete(b.get());
            flag = true;
        }
        return flag;
    }
}
