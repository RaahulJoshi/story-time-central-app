
package com.libraryhub.repository;

import com.libraryhub.model.Loan;
import com.libraryhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    
    List<Loan> findByUser(User user);
    
    List<Loan> findByUserAndStatus(User user, Loan.LoanStatus status);
}
