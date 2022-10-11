package com.usa.g36eq9.service;

import com.usa.g36eq9.model.Score;
import com.usa.g36eq9.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }
    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }
    public Score save(Score score){
        if(score.getIdScore() == null){
            return scoreRepository.save(score);
        }else{
            Optional<Score> aux = scoreRepository.getScore(score.getIdScore());
            if(aux.isPresent()){
                return score;
            }else{
                return scoreRepository.save(score);
            }
        }
    }
    public Score update(Score score){
        if(score.getIdScore() != null){
            Optional<Score> q = scoreRepository.getScore(score.getIdScore());
            if(q.isPresent()){
                if(score.getMessageText() != null){
                    q.get().setMessageText(score.getMessageText());
                }
                if(score.getStars() != null){
                    q.get().setStars(score.getStars());
                }
                scoreRepository.save(q.get());
                return q.get();
            }else{
                return score;
            }
        }else{
            return score;
        }
    }
    public boolean delete(int idScore){
        boolean flag = false;
        Optional<Score> score = scoreRepository.getScore(idScore);
        if(score.isPresent()){
            scoreRepository.delete(score.get());
            flag = true;
        }
        return flag;
    }
}
